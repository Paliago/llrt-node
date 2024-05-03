import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const ddbClient = new DynamoDBClient({});
const client = DynamoDBDocumentClient.from(ddbClient);

const app = new Hono()
  .get("/thing/:id", async (c) => {
    const { id } = c.req.param();

    const keys: GetCommandInput = {
      TableName: Resource.Table.value,
      Key: {
        pk: "thing",
        sk: id,
      },
    };

    const res = await client.send(new GetCommand(keys));
    const item = res.Item;

    return c.json(item);
  })
  .get("/otherThing/:id", async (c) => {
    const { id } = c.req.param();

    const keys: GetCommandInput = {
      TableName: Resource.Table.value,
      Key: {
        pk: "otherThing",
        sk: id,
      },
    };

    const res = await client.send(new GetCommand(keys));
    const item = res.Item;

    return c.json(item);
  });

export const handler = handle(app);
