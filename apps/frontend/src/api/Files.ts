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

import { HttpClient, RequestParams } from "./http-client";

export class Files<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name DownloadFilesAdminControllerGetFile
   * @request GET:/files/{file}
   */
  downloadFilesAdminControllerGetFile = (file: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/files/${file}`,
      method: "GET",
      ...params,
    });
}
