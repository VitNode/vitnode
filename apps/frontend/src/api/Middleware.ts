/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ShowCoreMiddlewareObj } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Middleware<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Middleware
   * @name MiddlewareControllerShow
   * @request GET:/middleware
   */
  middlewareControllerShow = (params: RequestParams = {}) =>
    this.request<ShowCoreMiddlewareObj, any>({
      path: `/middleware`,
      method: "GET",
      format: "json",
      ...params,
    });
}
