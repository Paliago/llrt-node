/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Base: {
      name: string
      type: "sst.aws.Dynamo"
    }
    Get: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
    Post: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
  }
}
export {}