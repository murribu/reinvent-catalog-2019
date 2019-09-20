#!/bin/bash
tail cdkdeployresult_cognito.txt
cd cdk
echo "y" | cdk destroy ReinventCatalogTestingCognito
echo "y" | cdk destroy ReinventCatalogTestingDynamoDb
echo "y" | cdk destroy ReinventCatalogTestingS3
