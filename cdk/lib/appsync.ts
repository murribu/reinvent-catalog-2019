// For Integrity, perhaps I should have two APIs - one in VA and one in London. Perhaps two S3 buckets as well - which call the different APIs. Hmmm...

import cdk = require("@aws-cdk/core");
import appsync = require("@aws-cdk/aws-appsync");
import dynamodb = require("@aws-cdk/aws-dynamodb");
import cognito = require("@aws-cdk/aws-cognito");
import iam = require("@aws-cdk/aws-iam");
import fs = require("fs");
import config = require("../config");

const projectname = config.default.projectname;
const env = config.default.environment;

interface DynamoDbProps {
  table: dynamodb.Table;
}

interface CognitoProps {
  userpool: cognito.UserPool;
  identitypool: cognito.CfnIdentityPool;
}

interface DynamoDbAndCognitoProps {
  dynamoDb: DynamoDbProps;
  cognito: CognitoProps;
}

export class Appsync extends cdk.Stack {
  public readonly api: appsync.CfnGraphQLApi;
  constructor(
    scope: cdk.Construct,
    id: string,
    props: DynamoDbAndCognitoProps
  ) {
    super(scope, id);

    const apiname = `${projectname}${env}`;

    this.api = new appsync.CfnGraphQLApi(this, apiname, {
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      userPoolConfig: {
        awsRegion: "us-east-1",
        userPoolId: props.cognito.userpool.userPoolId,
        defaultAction: "ALLOW"
      },
      name: apiname
    });

    const self = this;

    fs.readFile("./assets/appsync/schema.graphql", "utf8", function(err, data) {
      if (err) throw err;
      new appsync.CfnGraphQLSchema(self, `${apiname}Schema`, {
        apiId: self.api.attrApiId,
        definition: data
      });
    });

    /*{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-east-1:456500572160:table/ReinventCatalogDev",
                "arn:aws:dynamodb:us-east-1:456500572160:table/ReinventCatalogDev/*"
            ]
        }
    ]
}*/
    // CREATE A ROLE THAT HAS A POLICY LIKE THE ONE ABOVE AND ATTACH IT TO THE DATASOURCE BELOW

    const policyDocument = new iam.PolicyDocument();
    const policyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW
    });
    policyStatement.addActions(
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:UpdateItem"
    );
    policyStatement.addResources(
      props.dynamoDb.table.tableArn,
      props.dynamoDb.table.tableArn + "/*"
    );
    policyDocument.addStatements(policyStatement);

    const role = new iam.Role(this, `${apiname}RoleAppsyncDS`, {
      assumedBy: new iam.ServicePrincipal("appsync.amazonaws.com"),
      inlinePolicies: { dynamoDSPolicyDocument: policyDocument }
    });

    const ds = new appsync.CfnDataSource(this, `${apiname}DataSource`, {
      apiId: this.api.attrApiId,
      name: `${apiname}DataSource`,
      type: "AMAZON_DYNAMODB",
      dynamoDbConfig: {
        awsRegion: "us-east-1",
        tableName: props.dynamoDb.table.tableName
      },
      serviceRoleArn: role.roleArn
    });

    fs.readFile(
      "./assets/appsync/resolvers/Query.fetchMyProfile.request",
      "utf8",
      function(err, requestTemplate) {
        if (err) throw err;
        fs.readFile(
          "./assets/appsync/resolvers/Query.fetchMyProfile.response",
          "utf8",
          function(err, responseTemplate) {
            if (err) throw err;
            new appsync.CfnResolver(self, `${apiname}fetchMyProfile`, {
              apiId: self.api.attrApiId,
              fieldName: "fetchMyProfile",
              typeName: "Query",
              dataSourceName: ds.attrName,
              kind: "UNIT",
              requestMappingTemplate: requestTemplate,
              responseMappingTemplate: responseTemplate
            });
          }
        );
      }
    );

    new cdk.CfnOutput(this, "apiurl", {
      description: "apiurl",
      value: this.api.attrGraphQlUrl
    });
  }
}
