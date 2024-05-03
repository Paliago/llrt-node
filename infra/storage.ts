export const table = new sst.aws.Dynamo("Base", {
  fields: {
    pk: "string",
    sk: "string",
  },
  primaryIndex: {
    hashKey: "pk",
    rangeKey: "sk",
  },
  stream: "new-and-old-images",
});

table.subscribe("packages/backend/src/subscriber.handler");
