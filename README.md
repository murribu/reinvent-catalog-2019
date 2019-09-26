# basic-cdk

Starting point for my Serverless CDK projects

# Setup

## Install the AWS CDK CLI

```
npm i -g aws-cdk
```

## Set up a profile

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

# To deploy

Create `cdk/config.ts` and put something like this in it:

```
export default {
  environment: "Dev",
  projectname: "ReinventCatalog"
};
```

Then...

```
mkdir build
cd cdk/assets/lambda/createuser
yarn
cd ../../..
yarn build && cdk synth
cdk deploy ReinventCatalogDevCognito --require-approval never &> ../cdkdeployresult_cognito.txt
wait $!
cdk deploy ReinventCatalogDevAppsync --require-approval never &> ../cdkdeployresult_appsync.txt
wait $!
cdk deploy ReinventCatalogDevCognitoIam --require-approval never
cd ..
echo "export default {};" > src/config.js
node parseAwsOutputs.js src/config.js
yarn build
cd cdk
cdk deploy ReinventCatalogDevS3 --require-approval never
```

After that, go into the AWS console and...

1. Find your Cognito User Pool, click on `MFA and verifications`, and enable the checkbox next to `Time-based One-time Password` under `Which second factors do you want to enable?`, and save your changes.
1. Set up Global Tables in Dynamo, if desired

These things are either not supported in CloudFormation or CDK, or they are supported poorly.
