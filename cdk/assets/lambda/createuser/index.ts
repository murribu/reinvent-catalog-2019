import * as lambda from "aws-lambda";
import * as AWS from "aws-sdk";

interface DynamicItem {
  [key: string]: any;
}

interface DynamicObject {
  [key: string]: {
    TableName: string;
    Item?: any;
    Key?: any;
    UpdateExpression?: any;
    ExpressionAttributeValues?: any;
  };
}

exports.handler = async (event: any, serverlessContext: lambda.Context) => {
  console.log("version 16");
  console.log("createuser event", event);

  const date = new Date();
  const dateAsIso = date.toISOString();

  const tableName: string = process.env.DYNAMODBTABLE || "";

  const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  const dynamoClient = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  let dbQueryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: "PK = :pk AND SK BETWEEN :sk1 AND :sk2",
    ExpressionAttributeValues: {
      ":pk": "indices",
      ":sk1": "organizationIdx",
      ":sk2": "userIdx"
    }
  };

  let userSub = event.request.userAttributes["sub"];
  let organizationIdx: number = 1;
  let newUserIndex: DynamicObject;
  let newOrganizationIndex: DynamicObject;
  try {
    const indicesResponse = await dynamo.query(dbQueryParams).promise();
    console.log("indicesResponse", indicesResponse);
    const indices = indicesResponse.Items as AWS.DynamoDB.DocumentClient.AttributeMap[];
    console.log("indices", indices);
    indices.forEach(index => {
      if (index.SK === "organizationIdx") {
        organizationIdx = parseInt(index.indexvalue) + 1;
      }
    });
  } catch (getErr) {
    console.log(getErr);
    console.log("no indices found");
  }

  if (organizationIdx === 1) {
    newOrganizationIndex = {
      Put: {
        Item: {
          indexvalue: { N: "1" },
          PK: { S: "indices" },
          SK: { S: "organizationIdx" },
          createdAt: { S: dateAsIso },
          updatedAt: { S: dateAsIso }
        },
        TableName: tableName
      }
    };
  } else {
    newOrganizationIndex = {
      Update: {
        TableName: tableName,
        Key: { PK: { S: "indices" }, SK: { S: "organizationIdx" } },
        UpdateExpression:
          "set indexvalue = :organizationIdx, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":organizationIdx": { N: organizationIdx.toString() },
          ":updatedAt": { S: dateAsIso }
        }
      }
    };
  }
  let dbPutParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
    Item: {
      firstName: event.request.userAttributes["custom:first_name"],
      lastName: event.request.userAttributes["custom:last_name"],
      organization: event.request.userAttributes["custom:organization"],
      email: event.request.userAttributes["email"],
      PK: "user" + userSub,
      SK: "user",
      createdAt: { S: dateAsIso },
      updatedAt: { S: dateAsIso }
    },
    TableName: tableName,
    ReturnConsumedCapacity: "NONE"
  };
  let organizationItem: DynamicItem = {
    PK: { S: "organization" + organizationIdx.toString() },
    SK: { S: "organization" },
    createdAt: { S: dateAsIso },
    updatedAt: { S: dateAsIso }
  };
  let userItem: DynamicItem = {
    createdAt: { S: dateAsIso },
    updatedAt: { S: dateAsIso }
  };
  if (
    event.request.userAttributes["custom:first_name"] &&
    event.request.userAttributes["custom:first_name"] !== ""
  )
    userItem["firstName"] = {
      S: event.request.userAttributes["custom:first_name"]
    };
  if (
    event.request.userAttributes["custom:last_name"] &&
    event.request.userAttributes["custom:last_name"] !== ""
  )
    userItem["lastName"] = {
      S: event.request.userAttributes["custom:last_name"]
    };
  if (
    event.request.userAttributes["custom:organization"] &&
    event.request.userAttributes["custom:organization"] !== ""
  ) {
    organizationItem["name"] = {
      S: event.request.userAttributes["custom:organization"]
    };
    userItem["organization"] = {
      S: event.request.userAttributes["custom:organization"]
    };
  }
  userItem["PK"] = { S: "user" + userSub };
  userItem["SK"] = { S: "user" };
  let userOrganizationItem: DynamicItem = {
    PK: { S: "user" + userSub },
    SK: { S: "organization" },
    organizationId: { N: organizationIdx.toString() },
    organizationName: {
      S: event.request.userAttributes["custom:organization"]
    },
    admin: { BOOL: true },
    createdAt: { S: dateAsIso },
    updatedAt: { S: dateAsIso }
  };
  console.log("userItem", userItem);
  console.log("organizationItem", organizationItem);
  console.log("userOrganizationItem", userOrganizationItem);

  try {
    const data = await dynamoClient
      .transactWriteItems({
        TransactItems: [
          {
            Put: {
              Item: userItem,
              TableName: tableName,
              ConditionExpression:
                "attribute_not_exists(PK) and attribute_not_exists(SK)"
            }
          },
          {
            Put: {
              Item: organizationItem,
              TableName: tableName,
              ConditionExpression:
                "attribute_not_exists(PK) and attribute_not_exists(SK)"
            }
          },
          {
            Put: {
              Item: userOrganizationItem,
              TableName: tableName,
              ConditionExpression:
                "attribute_not_exists(PK) and attribute_not_exists(SK)"
            }
          },
          newOrganizationIndex
        ]
      })
      .promise();
    console.log({
      statusCode: 200,
      body: JSON.stringify({ dbPutParams, data })
    });
  } catch (putError) {
    console.log({
      statusCode: 400,
      error: putError
    });
  }

  return event;
};
