import { table } from "./storage";
import * as pulumi from "@pulumi/pulumi";

// create llrt layer
const layer = new aws.lambda.LayerVersion("llrt", {
  layerName: "llrt",
  code: new pulumi.asset.AssetArchive({
    config: new pulumi.asset.FileArchive("./layer"),
  }),
});

// TODO: set llrt runtime
export const api = {
  get: new sst.aws.Function("Get", {
    handler: "packages/api/src/get.handler",
    url: true,
    link: [table],
    architecture: "arm64",
    runtime: "provided.al2023",
    layers: [layer.arn],
  }),
  post: new sst.aws.Function("Post", {
    handler: "packages/api/src/post.handler",
    url: true,
    link: [table],
    architecture: "arm64",
  }),
};
