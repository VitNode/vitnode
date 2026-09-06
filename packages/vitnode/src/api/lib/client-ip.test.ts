import { Hono } from "hono";
import { describe, expect, it } from "vitest";

import { clientIpMiddleware } from "./client-ip";

interface Env {
  Variables: { ipAddress: string };
}

const resolve = async ({
  headers,
  socket,
}: {
  headers?: Record<string, string>;
  socket?: string;
}): Promise<string> => {
  const app = new Hono<Env>();
  app.use("*", clientIpMiddleware);
  app.get("/", c => c.text(c.get("ipAddress")));

  const res = await app.request(
    "/",
    { headers },
    socket === undefined
      ? undefined
      : { incoming: { socket: { remoteAddress: socket } } },
  );

  return await res.text();
};

describe("clientIpMiddleware", () => {
  it("uses the socket address", async () => {
    await expect(resolve({ socket: "203.0.113.7" })).resolves.toBe(
      "203.0.113.7",
    );
  });

  it("falls back to localhost when the runtime exposes no socket", async () => {
    await expect(resolve({})).resolves.toBe("127.0.0.1");
  });

  it.each([
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "true-client-ip",
    "client-ip",
    "forwarded",
  ])("ignores the client-settable %s header", async header => {
    await expect(
      resolve({ socket: "203.0.113.7", headers: { [header]: "9.9.9.9" } }),
    ).resolves.toBe("203.0.113.7");
  });

  it("ignores a forwarded chain even with no socket to fall back to", async () => {
    await expect(
      resolve({ headers: { "x-forwarded-for": "9.9.9.9, 203.0.113.7" } }),
    ).resolves.toBe("127.0.0.1");
  });
});
