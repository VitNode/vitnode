import type { Context } from "hono";

import type { EnvVitNode } from "../middlewares/global.middleware";

/** What streaming a stored object back needs to know about it. */
export interface StoredFileForDownload {
  key: string;
  mimeType: null | string;
  name: string;
}

/**
 * One stored object, re-streamed as an attachment under its original name.
 *
 * Adapter-agnostic: the object is fetched from its (server-reachable) public
 * URL, so the browser saves it with the name the uploader gave it instead of
 * opening it inline under a storage key.
 *
 * `null` when the object could not be fetched at all, which each route answers
 * with its own `404 { error: "File not found" }`. Who may download which file
 * is decided before this is ever called - the lookup and the authorization stay
 * in the routes, and this only knows how to send one.
 */
export const attachStoredFile = async (
  c: Context<EnvVitNode>,
  file: StoredFileForDownload,
): Promise<null | Response> => {
  const upstream = await fetch(c.get("storage").getUrl(file.key));
  if (!upstream.ok || !upstream.body) return null;

  c.header("Content-Type", file.mimeType ?? "application/octet-stream");
  // `filename*` with percent-encoding rather than a bare `filename`: a name can
  // carry a quote, a semicolon or anything non-ASCII, and any of those would
  // otherwise break the header or truncate the name.
  c.header(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
  );
  const length = upstream.headers.get("content-length");
  if (length) {
    c.header("Content-Length", length);
  }

  return c.body(upstream.body, 200);
};
