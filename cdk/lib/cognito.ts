import cdk = require("@aws-cdk/core");
import cognito = require("@aws-cdk/aws-cognito");
import iam = require("@aws-cdk/aws-iam");
import lambda = require("@aws-cdk/aws-lambda");
import ec2 = require("@aws-cdk/aws-ec2");
import cfn = require("@aws-cdk/aws-cloudformation");
import dynamodb = require("@aws-cdk/aws-dynamodb");

import config = require("../config");

const projectname = config.default.projectname;
const env = config.default.environment;

interface DynamoDbProps {
  table: dynamodb.Table;
}

export class Cognito extends cdk.Stack {
  public readonly webClientId: string;
  public readonly region: string;
  constructor(scope: cdk.Construct, id: string, props: DynamoDbProps) {
    super(scope, id);

    const fnCreateUser = new lambda.Function(
      this,
      `${projectname}${env}CreateUser`,
      {
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: "src/index.handler",
        code: lambda.Code.asset("./assets/lambda/createuser"),
        environment: {
          DYAMNODBTABLE: props.table.tableName
        },
        timeout: cdk.Duration.seconds(30)
      }
    );

    const userPool = new cognito.UserPool(
      this,
      `${projectname}${env}CfnUserPool`,
      {
        signInType: cognito.SignInType.EMAIL,
        autoVerifiedAttributes: [cognito.UserPoolAttribute.EMAIL]
      }
    );

    userPool.addPostConfirmationTrigger(fnCreateUser);

    const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;

    cfnUserPool.schema = [
      {
        attributeDataType: "String",
        developerOnlyAttribute: false,
        mutable: true,
        name: "organization",
        required: false,
        stringAttributeConstraints: {
          maxLength: "255",
          minLength: "1"
        }
      },
      {
        attributeDataType: "String",
        developerOnlyAttribute: false,
        mutable: true,
        name: "first_name",
        required: false,
        stringAttributeConstraints: {
          maxLength: "255",
          minLength: "1"
        }
      },
      {
        attributeDataType: "String",
        developerOnlyAttribute: false,
        mutable: true,
        name: "last_name",
        required: false,
        stringAttributeConstraints: {
          maxLength: "255",
          minLength: "1"
        }
      },
      {
        attributeDataType: "Number",
        developerOnlyAttribute: true,
        mutable: false,
        name: "organization_id",
        required: false,
        numberAttributeConstraints: {
          minValue: "1"
        }
      },
      {
        attributeDataType: "Number",
        developerOnlyAttribute: true,
        mutable: false,
        name: "user_id",
        required: false,
        numberAttributeConstraints: {
          minValue: "1"
        }
      }
    ];
    cfnUserPool.policies = {
      passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireUppercase: false,
        requireSymbols: false,
        requireNumbers: false,
        temporaryPasswordValidityDays: 7
      }
    };

    const cfnUserPoolClient = new cognito.CfnUserPoolClient(
      this,
      `${projectname}${env}UserPoolClient`,
      {
        clientName: "web",
        userPoolId: cfnUserPool.ref,
        generateSecret: false
      }
    );

    const unauthPolicyDocument = new iam.PolicyDocument();

    const unauthPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });

    unauthPolicyStatement.addActions("cognito-sync:*");

    unauthPolicyStatement.addResources("*");
    unauthPolicyDocument.addStatements(unauthPolicyStatement);

    const authPolicyDocument = new iam.PolicyDocument();

    const authPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });

    authPolicyStatement.addActions("cognito-sync:*");

    authPolicyStatement.addResources("*");
    authPolicyDocument.addStatements(authPolicyStatement);

    const cfnIdentityPool = new cognito.CfnIdentityPool(
      this,
      `${projectname}${env}IdentityPool`,
      {
        cognitoIdentityProviders: [
          {
            providerName: cfnUserPool.attrProviderName,
            clientId: cfnUserPoolClient.ref
          }
        ],
        allowUnauthenticatedIdentities: false
      }
    );

    const principle = new iam.FederatedPrincipal(
      "cognito-identity.amazonaws.com",
      {
        StringEquals: {
          "cognito-identity.amazonaws.com:aud": cfnIdentityPool.ref
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated"
        }
      },
      "sts:AssumeRoleWithWebIdentity"
    );

    const unauthRole = new iam.Role(this, `${projectname}${env}UnauthRole`, {
      assumedBy: principle,
      roleName: `a${projectname}${env}UnauthRole`,
      inlinePolicies: {
        unauthPolicyDocument: unauthPolicyDocument
      }
    });

    const authRole = new iam.Role(this, `${projectname}${env}AuthRole`, {
      assumedBy: new iam.FederatedPrincipal("cognito-identity.amazonaws.com", {
        StringEquals: {
          "cognito-identity.amazonaws.com:aud": cfnIdentityPool.ref
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }),
      roleName: `a${projectname}${env}AuthRole`,
      inlinePolicies: {
        unauthPolicyDocument: authPolicyDocument
      }
    });

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      `${projectname}${env}RoleAttachment`,
      {
        identityPoolId: cfnIdentityPool.ref,
        roles: {
          unauthenticated: unauthRole.roleArn,
          authenticated: authRole.roleArn
        }
      }
    );

    new cdk.CfnOutput(this, "userpoolid", {
      description: "userpoolid",
      value: cfnUserPool.ref
    });

    new cdk.CfnOutput(this, "webclientid", {
      description: "webclientid",
      value: cfnUserPoolClient.ref
    });

    this.webClientId = cfnUserPoolClient.ref;

    new cdk.CfnOutput(this, "identitypoolid", {
      description: "identitypoolid",
      value: cfnIdentityPool.ref
    });

    new cdk.CfnOutput(this, "cognitoregion", {
      description: "cognitoregion",
      value: "us-east-1"
    });

    this.region = "us-east-1";
  }
}
