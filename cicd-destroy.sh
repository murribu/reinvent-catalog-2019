#!/bin/bash
tail cdkdeployresult_cognito.txt
cd cdk
echo "y" | cdk destroy ReinventCatalogCognito
echo "y" | cdk destroy ReinventCatalogDynamoDb
echo "y" | cdk destroy ReinventCatalogS3
