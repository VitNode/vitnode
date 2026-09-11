// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_FORBIDDEN_CLIENT_MODULES,
  findClientLeaks,
  secretValuesOf,
  vitNodeClientGuard,
} from "./client-guard";

const CONFIG = "/app/src/vitnode.config.ts";

const chunk = (fileName: string, moduleIds: string[], code = "") => ({
  code,
  fileName,
  moduleIds,
  type: "chunk" as const,
});

describe("findClientLeaks", () => {
  it("accepts a bundle that only holds browser code", () => {
    expect(
      findClientLeaks(
        [
          chunk("assets/index.js", [
            "/app/src/routes/__root.tsx",
            "/app/src/vitnode.public.gen.ts",
            "/app/node_modules/@vitnode/core/dist/src/config/index.js",
            "/app/node_modules/react/index.js",
          ]),
          { fileName: "assets/style.css", type: "asset" as const },
        ],
        { configPath: CONFIG },
      ),
    ).toEqual([]);
  });

  it("names a chunk that bundles the root config", () => {
    const problems = findClientLeaks([chunk("assets/index.js", [CONFIG])], {
      configPath: CONFIG,
    });

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("bundles the root config");
    expect(problems[0]).toContain("vitnode.public.gen.ts");
  });

  it("treats a query-suffixed module id as the same file", () => {
    expect(
      findClientLeaks([chunk("a.js", [`${CONFIG}?v=1`])], {
        configPath: CONFIG,
      }),
    ).toHaveLength(1);
  });

  it.each([
    "/app/node_modules/@vitnode/blog/dist/src/config.api.js",
    "/app/node_modules/drizzle-orm/postgres-js/index.js",
    "/app/node_modules/postgres/src/index.js",
    "/app/node_modules/@vitnode/supabase-storage/dist/index.js",
    "/app/node_modules/@vitnode/core/dist/src/config/server.js",
    "/app/node_modules/@vitnode/core/dist/src/api/config.js",
    "/app/src/vitnode.api.config.ts",
    "/app/src/vitnode.server.config.ts",
  ])("flags the server-only module %s", id => {
    const problems = findClientLeaks([chunk("a.js", [id])], {
      configPath: CONFIG,
    });

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("server-only module");
  });

  it("does not flag core modules the browser legitimately uses", () => {
    expect(
      findClientLeaks(
        [
          chunk("a.js", [
            "/app/node_modules/@vitnode/core/dist/src/api/lib/staff-permission.js",
            "/app/node_modules/@vitnode/core/dist/src/tanstack/fetcher/index.js",
            "/app/node_modules/@vitnode/blog/dist/src/config.js",
            "/app/node_modules/@vitnode/blog/dist/src/admin/nav.js",
          ]),
        ],
        { configPath: CONFIG },
      ),
    ).toEqual([]);
  });

  it("finds a secret's value inside emitted code", () => {
    const problems = findClientLeaks(
      [
        chunk(
          "a.js",
          [],
          'const url = "postgresql://root:hunter22@db/vitnode"',
        ),
      ],
      {
        configPath: CONFIG,
        secrets: [
          {
            key: "POSTGRES_URL",
            value: "postgresql://root:hunter22@db/vitnode",
          },
        ],
      },
    );

    expect(problems).toEqual([
      "a.js contains the value of the POSTGRES_URL environment variable.",
    ]);
  });

  it("honours a custom forbidden list", () => {
    expect(
      findClientLeaks([chunk("a.js", ["/app/src/secrets/keys.ts"])], {
        configPath: CONFIG,
        forbiddenModules: [...DEFAULT_FORBIDDEN_CLIENT_MODULES, /\/secrets\//],
      }),
    ).toHaveLength(1);
  });
});

describe("secretValuesOf", () => {
  it("picks secret-shaped keys with values long enough to be meaningful", () => {
    expect(
      secretValuesOf({
        NODE_ENV: "production",
        POSTGRES_URL: "postgresql://root:hunter22@db.internal:5432/vitnode",
        REDIS_PASSWORD: "root",
        SUPABASE_SECRET_KEY: "sb_secret_abcdef",
        VITNODE_API_URL: "http://localhost:8000",
      }).map(entry => entry.key),
    ).toEqual(["POSTGRES_URL", "SUPABASE_SECRET_KEY"]);
  });

  it("ignores local development values, which documentation legitimately shows", () => {
    expect(
      secretValuesOf({
        POSTGRES_URL: "postgresql://root:root@localhost:5432/vitnode",
        REDIS_URL: "redis://127.0.0.1:6379",
      }),
    ).toEqual([]);
  });

  it("skips keys the app asked it to ignore", () => {
    expect(
      secretValuesOf({ DEMO_TOKEN: "public-demo-token-value" }, ["DEMO_TOKEN"]),
    ).toEqual([]);
  });
});

describe("vitNodeClientGuard", () => {
  const plugin = vitNodeClientGuard({
    appRoot: "/app",
    configPath: CONFIG,
    env: { POSTGRES_URL: "postgresql://root:hunter22@db/vitnode" },
  });

  const contextFor = (environment: string, resolvedId: null | string) => ({
    environment: { name: environment },
    resolve: vi.fn(
      async () =>
        await Promise.resolve(
          resolvedId === null ? null : { external: false, id: resolvedId },
        ),
    ),
  });

  const resolveId = plugin.resolveId as (
    this: unknown,
    source: string,
    importer: string | undefined,
  ) => Promise<unknown>;

  const generateBundle = plugin.generateBundle as (
    this: unknown,
    options: unknown,
    bundle: Record<string, unknown>,
  ) => void;

  it("fails a client import of the root config, naming the importer", async () => {
    await expect(
      resolveId.call(
        contextFor("client", CONFIG),
        "@/vitnode.config",
        "/app/src/routes/__root.tsx",
      ),
    ).rejects.toThrow(
      /\/app\/src\/routes\/__root\.tsx imports the root config/,
    );
  });

  it("lets the server import the root config", async () => {
    await expect(
      resolveId.call(
        contextFor("ssr", CONFIG),
        "@/vitnode.config",
        "/app/src/server/messages.server.ts",
      ),
    ).resolves.toBeNull();
  });

  it("ignores every other client import", async () => {
    await expect(
      resolveId.call(
        contextFor("client", "/app/src/vitnode.public.gen.ts"),
        "@/vitnode.public.gen",
        "/app/src/routes/__root.tsx",
      ),
    ).resolves.toBeNull();
  });

  it("fails the client build when a chunk leaks", () => {
    expect(() =>
      generateBundle.call(
        { environment: { name: "client" } },
        {},
        {
          "assets/index.js": chunk("assets/index.js", [CONFIG]),
        },
      ),
    ).toThrow(/browser bundle would ship server-only code/);
    expect(() =>
      generateBundle.call(
        { environment: { name: "client" } },
        {},
        {
          "assets/index.js": chunk(
            "assets/index.js",
            [],
            "postgresql://root:hunter22@db/vitnode",
          ),
        },
      ),
    ).toThrow(/POSTGRES_URL/);
  });

  it("leaves the server bundle alone", () => {
    expect(() =>
      generateBundle.call(
        { environment: { name: "ssr" } },
        {},
        {
          "index.mjs": chunk("index.mjs", [CONFIG]),
        },
      ),
    ).not.toThrow();
  });
});
