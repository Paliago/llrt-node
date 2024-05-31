import { table } from "./storage";
import * as pulumi from "@pulumi/pulumi";

const layer = new aws.lambda.LayerVersion("Llrt", {
  layerName: "llrt",
  code: new pulumi.asset.AssetArchive({
    config: new pulumi.asset.FileArchive("./layer"),
  }),
});

export const api = {
  get: new sst.aws.Function("Get", {
    handler: "packages/api/src/get.handler",
    url: true,
    link: [table],
    architecture: "arm64",
    // runtime: "provided.al2023",
    layers: [layer.arn],
  }),
  post: new sst.aws.Function("Post", {
    handler: "packages/api/src/post.handler",
    url: true,
    link: [table],
    architecture: "arm64",
  }),
};
