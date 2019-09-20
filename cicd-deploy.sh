#!/bin/bash
mkdir build
cd cdk
yarn
yarn build && cdk synth
cdk deploy ReinventCatalogDevCognito --require-approval never &> ../cdkdeployresult_cognito.txt
wait $!
cd ..
echo "export default {};" > src/config.js
node parseAwsOutputs.js cdkdeployresult_cognito.txt src/config.js
chmod +x setAwsResourcesEnvVars.sh
. ./setAwsResourcesEnvVars.sh
aws cognito-idp sign-up --region us-east-1 --client-id $WEBCLIENTID --username admin@example.com --password Passw0rd!
aws cognito-idp admin-confirm-sign-up --region us-east-1 --user-pool-id $USERPOOLID --username admin@example.com
