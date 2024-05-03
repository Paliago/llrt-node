/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "llrt",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "eu-north-1",
    };
  },
  async run() {
    const infra = await import("./infra");

    return {
      get: infra.api.get.url,
      post: infra.api.post.url,
      table: infra.table.name,
    };
  },
});
