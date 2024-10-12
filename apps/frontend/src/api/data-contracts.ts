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

export interface AuthorizationCoreMiddleware {
  force_login: boolean;
  lock_register: boolean;
}

export enum AllowTypeFilesEnum {
  All = "all",
  Images = "images",
  ImagesVideos = "images_videos",
  None = "none",
}

export interface FilesEditorShowCoreMiddleware {
  allow_type: AllowTypeFilesEnum;
}

export interface EditorShowCoreMiddleware {
  files: FilesEditorShowCoreMiddleware;
  sticky: boolean;
}

export enum CaptchaTypeEnum {
  CloudflareTurnstile = "cloudflare_turnstile",
  None = "none",
  RecaptchaV2Checkbox = "recaptcha_v2_checkbox",
  RecaptchaV2Invisible = "recaptcha_v2_invisible",
  RecaptchaV3 = "recaptcha_v3",
}

export interface CaptchaSecurityCoreMiddleware {
  site_key: string;
  type: CaptchaTypeEnum;
}

export interface SecurityCoreMiddleware {
  captcha: CaptchaSecurityCoreMiddleware;
}

export interface ShowCoreMiddlewareObj {
  authorization: AuthorizationCoreMiddleware;
  editor: EditorShowCoreMiddleware;
  is_ai_enabled: boolean;
  is_email_enabled: boolean;
  languages: string[];
  /** @example ["welcome","blog"] */
  plugins: string[];
  security: SecurityCoreMiddleware;
}
