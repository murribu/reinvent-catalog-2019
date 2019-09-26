import cdk = require("@aws-cdk/core");
import cognito = require("@aws-cdk/aws-cognito");
import iam = require("@aws-cdk/aws-iam");
import appsync = require("@aws-cdk/aws-appsync");

import config = require("../config");

const projectname = config.default.projectname;
const env = config.default.environment;

interface AppsyncProps {
  api: appsync.CfnGraphQLApi;
}

interface CognitoProps {
  userpool: cognito.UserPool;
  identitypool: cognito.CfnIdentityPool;
}

interface AppsyncAndCognitoProps {
  appsync: AppsyncProps;
  cognito: CognitoProps;
}

export class CognitoIam extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AppsyncAndCognitoProps) {
    super(scope, id);

    const unauthPolicyDocument = new iam.PolicyDocument();

    const unauthPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });

    unauthPolicyStatement.addActions("cognito-sync:*");

    unauthPolicyStatement.addResources("*");
    unauthPolicyDocument.addStatements(unauthPolicyStatement);

    const cognitoAuthPolicyDocument = new iam.PolicyDocument();

    const cognitoAuthPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });

    cognitoAuthPolicyStatement.addActions(
      "cognito-sync:*",
      "cognito-identity:*"
    );

    cognitoAuthPolicyStatement.addResources("*");
    cognitoAuthPolicyDocument.addStatements(cognitoAuthPolicyStatement);

    const appsyncAuthPolicyDocument = new iam.PolicyDocument();
    const appsyncAuthPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });

    appsyncAuthPolicyStatement.addActions("appsync:GraphQL");
    appsyncAuthPolicyStatement.addResources(
      props.appsync.api.attrArn,
      "arn:aws:appsync:*:*:apis/*/types/*/fields/*"
    );
    cognitoAuthPolicyDocument.addStatements(appsyncAuthPolicyStatement);

    const unauthRole = new iam.Role(this, `${projectname}${env}UnauthRole`, {
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": props.cognito.identitypool.ref
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "unauthenticated"
          }
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      roleName: `a${projectname}${env}UnauthRole`,
      inlinePolicies: {
        unauthPolicyDocument: unauthPolicyDocument
      }
    });

    const authRole = new iam.Role(this, `${projectname}${env}AuthRole`, {
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": props.cognito.identitypool.ref
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated"
          }
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      roleName: `a${projectname}${env}AuthRole`,
      inlinePolicies: {
        cognitoAuthPolicyDocument: cognitoAuthPolicyDocument
      }
    });

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      `${projectname}${env}RoleAttachment`,
      {
        identityPoolId: props.cognito.identitypool.ref,
        roles: {
          unauthenticated: unauthRole.roleArn,
          authenticated: authRole.roleArn
        }
      }
    );
  }
}
