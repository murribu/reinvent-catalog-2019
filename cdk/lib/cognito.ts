import cdk = require("@aws-cdk/core");
import cognito = require("@aws-cdk/aws-cognito");
import iam = require("@aws-cdk/aws-iam");
import lambda = require("@aws-cdk/aws-lambda");
import ec2 = require("@aws-cdk/aws-ec2");
import cfn = require("@aws-cdk/aws-cloudformation");
import dynamodb = require("@aws-cdk/aws-dynamodb");
import appsync = require("@aws-cdk/aws-appsync");

import config = require("../config");

const projectname = config.default.projectname;
const env = config.default.environment;

interface DynamoDbProps {
  table: dynamodb.Table;
}

interface AppsyncProps {
  api: appsync.CfnGraphQLApi;
}

interface DynamoDbAndAppsyncProps {
  dynamoDb: DynamoDbProps;
  appsync: AppsyncProps;
}

export class Cognito extends cdk.Stack {
  public readonly webClientId: string;
  public readonly region: string;
  public readonly userpool: cognito.UserPool;
  public readonly identitypool: cognito.CfnIdentityPool;
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
          DYNAMODBTABLE: props.table.tableName
        },
        timeout: cdk.Duration.seconds(30)
      }
    );

    this.userpool = new cognito.UserPool(
      this,
      `${projectname}${env}CfnUserPool`,
      {
        signInType: cognito.SignInType.EMAIL,
        autoVerifiedAttributes: [cognito.UserPoolAttribute.EMAIL]
      }
    );

    this.userpool.addPostConfirmationTrigger(fnCreateUser);

    const createUserLambdaRole = fnCreateUser.role as iam.Role;

    const policyDynamoTable = new iam.Policy(
      this,
      `${projectname}${env}PolicyLambdaToDynamo`,
      {
        policyName: `${projectname}${env}PolicyLambdaToDynamo`
      }
    );

    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:Query"
      ]
    });

    policyDynamoTable.addStatements(policyStatement);

    createUserLambdaRole.attachInlinePolicy(policyDynamoTable);

    const cfnUserPool = this.userpool.node.defaultChild as cognito.CfnUserPool;

    cfnUserPool.mfaConfiguration = "OPTIONAL";

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

    this.identitypool = new cognito.CfnIdentityPool(
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
      value: this.identitypool.ref
    });

    new cdk.CfnOutput(this, "cognitoregion", {
      description: "cognitoregion",
      value: "us-east-1"
    });

    this.region = "us-east-1";
  }
}
