#!/bin/bash
cd cdk
echo "y" | cdk destroy ReinventCatalogTesting*
# cdk doesn't actually delete the table >:(
aws dynamodb delete-table --table-name ReinventCatalogTesting
