#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { S3 } from "../lib/s3";
import { DynamoDb } from "../lib/dynamodb";
import { Cognito } from "../lib/cognito";

import config from "../config";

const project = config.projectname;
const env = config.environment;

const app = new cdk.App();

new S3(app, `${project}${env}S3`);
const dynamoDb = new DynamoDb(app, `${project}${env}DynamoDb`);
new Cognito(app, `${project}${env}Cognito`, dynamoDb);
