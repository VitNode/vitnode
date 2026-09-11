export type VitNodeConfigErrorCode =
  | "api-entry-invalid"
  | "api-runtime-invalid"
  | "api-runtime-missing"
  | "browser-import"
  | "capability-unresolvable"
  | "config-invalid"
  | "duplicate-plugin"
  | "plugin-id-invalid"
  | "plugin-options-invalid"
  | "public-options-not-serializable"
  | "web-runtime-missing";

export const CONFIG_ERROR_PREFIX = "[VitNode config]";

export class VitNodeConfigError extends Error {
  constructor(
    code: VitNodeConfigErrorCode,
    message: string,
    options?: { cause?: unknown },
  ) {
    super(`${CONFIG_ERROR_PREFIX} ${message}`, options);
    this.name = "VitNodeConfigError";
    this.code = code;
  }

  readonly code: VitNodeConfigErrorCode;
}

export const isVitNodeConfigError = (
  error: unknown,
  code?: VitNodeConfigErrorCode,
): error is VitNodeConfigError =>
  error instanceof VitNodeConfigError &&
  (code === undefined || error.code === code);
