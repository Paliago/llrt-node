import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const ddbClient = new DynamoDBClient({});
const client = DynamoDBDocumentClient.from(ddbClient);

const app = new Hono()
  .post("/thing", async (c) => {
    const body = await c.req.json<{ id: string }>();

    const keys: PutCommandInput = {
      TableName: Resource.Base.name,
      Item: {
        pk: "thing",
        sk: body.id,
        ...body,
      },
    };

    const res = await client.send(new PutCommand(keys));

    if (res.$metadata.httpStatusCode !== 200) {
      console.error("put command failed", res);
      return c.text("Something went wrong adding the thing", 500);
    }

    return c.text("Added", 201);
  })
  .post("/otherThing", async (c) => {
    const body = await c.req.json<{ id: string }>();

    const keys: PutCommandInput = {
      TableName: Resource.Base.name,
      Item: {
        pk: "otherThing",
        sk: body.id,
        ...body,
      },
    };

    const res = await client.send(new PutCommand(keys));

    if (res.$metadata.httpStatusCode !== 200) {
      console.error("put command failed", res);
      return c.text("Something went wrong adding the other thing", 500);
    }

    return c.text("Added", 201);
  });

export const handler = handle(app);
