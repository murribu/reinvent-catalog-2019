#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { S3 } from "../lib/s3";
import { DynamoDb } from "../lib/dynamodb";
import { Cognito } from "../lib/cognito";
import { CognitoIam } from "../lib/cognito-iam";
import { Appsync } from "../lib/appsync";

import config from "../config";

const project = config.projectname;
const env = config.environment;

const app = new cdk.App();

new S3(app, `${project}${env}S3`);
const dynamoDb = new DynamoDb(app, `${project}${env}DynamoDb`);
const cognito = new Cognito(app, `${project}${env}Cognito`, dynamoDb);
const appsync = new Appsync(app, `${project}${env}Appsync`, {
  dynamoDb,
  cognito
});
new CognitoIam(app, `${project}${env}CognitoIam`, { appsync, cognito });
