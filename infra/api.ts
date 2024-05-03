import { table } from "./storage";

// TODO: set llrt runtime
export const api = {
  get: new sst.aws.Function("Get", {
    handler: "packages/api/src/get.handler",
    url: true,
    link: [table],
  }),
  post: new sst.aws.Function("Post", {
    handler: "packages/api/src/post.handler",
    url: true,
    link: [table],
  }),
};
