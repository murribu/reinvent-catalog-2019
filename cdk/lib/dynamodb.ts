import cdk = require("@aws-cdk/core");
import dynamodb = require("@aws-cdk/aws-dynamodb");

import config = require("../config");

const projectname = config.default.projectname;
const env = config.default.environment;

export class DynamoDb extends cdk.Stack {
  public readonly table: dynamodb.Table;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const tableName = `${projectname}${env}`;

    this.table = new dynamodb.Table(this, `${projectname}${env}`, {
      tableName: tableName,
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING }
    });

    const readScaling = this.table.autoScaleReadCapacity({
      minCapacity: 1,
      maxCapacity: 50
    });

    const writeScaling = this.table.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 50
    });

    readScaling.scaleOnUtilization({
      targetUtilizationPercent: 70
    });

    writeScaling.scaleOnUtilization({
      targetUtilizationPercent: 70
    });

    // const gsi1 = this.table.addGlobalSecondaryIndex({
    //   indexName: "GSI1PK",
    //   partitionKey: {
    //     name: "GSI1PK",
    //     type: dynamodb.AttributeType.STRING
    //   },
    //   sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING }
    // });

    // const gsi1ReadCapacity = this.table.autoScaleGlobalSecondaryIndexReadCapacity(
    //   "GSI1PK",
    //   {
    //     minCapacity: 1,
    //     maxCapacity: 50
    //   }
    // );

    // gsi1ReadCapacity.scaleOnUtilization({ targetUtilizationPercent: 70 });

    // const gsi1WriteCapacity = this.table.autoScaleGlobalSecondaryIndexWriteCapacity(
    //   "GSI1PK",
    //   {
    //     minCapacity: 1,
    //     maxCapacity: 50
    //   }
    // );

    // gsi1WriteCapacity.scaleOnUtilization({ targetUtilizationPercent: 70 });
  }
}
