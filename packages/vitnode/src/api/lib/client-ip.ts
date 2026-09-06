import type { Context } from "hono";

const UNKNOWN_CLIENT_IP = "127.0.0.1";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const nonEmptyString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const nodeSocketAddress = (
  env: Record<string, unknown>,
): string | undefined => {
  const incoming = env.incoming;
  if (!isRecord(incoming)) return undefined;

  const socket = incoming.socket;
  if (!isRecord(socket)) return undefined;

  return nonEmptyString(socket.remoteAddress);
};

const bunSocketAddress = (
  env: Record<string, unknown>,
  request: Request,
): string | undefined => {
  const server = env.server;
  if (!isRecord(server)) return undefined;

  const requestIP = server.requestIP;
  if (typeof requestIP !== "function") return undefined;

  const info: unknown = (requestIP as (request: Request) => unknown)(request);

  return isRecord(info) ? nonEmptyString(info.address) : undefined;
};

const denoSocketAddress = (
  env: Record<string, unknown>,
): string | undefined => {
  const remoteAddr = env.remoteAddr;

  return isRecord(remoteAddr) ? nonEmptyString(remoteAddr.hostname) : undefined;
};

const socketAddress = (c: Context): string | undefined => {
  const env: unknown = c.env;
  if (!isRecord(env)) return undefined;

  return (
    nodeSocketAddress(env) ??
    bunSocketAddress(env, c.req.raw) ??
    denoSocketAddress(env)
  );
};

export const resolveClientIp = (c: Context): string =>
  socketAddress(c) ?? UNKNOWN_CLIENT_IP;

export const clientIpMiddleware = async (
  c: Context,
  next: () => Promise<void>,
) => {
  c.set("ipAddress", resolveClientIp(c));

  await next();
};
