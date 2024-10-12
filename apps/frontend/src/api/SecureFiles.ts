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

export class SecureFiles<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name DownloadSecureFilesControllerGetFile
   * @request GET:/secure_files/{id}
   */
  downloadSecureFilesControllerGetFile = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/secure_files/${id}`,
      method: "GET",
      ...params,
    });
}
