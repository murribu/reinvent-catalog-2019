import * as lambda from "aws-lambda";

exports.handler = async (event: any, serverlessContext: lambda.Context) => {
  console.log("createuser event", event);
};
