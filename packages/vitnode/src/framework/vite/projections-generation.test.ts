// @vitest-environment node
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  generatedProjectionPaths,
  writeGeneratedProjections,
} from "./plugin-routes";

const CORE_CONFIG = resolve(
  import.meta.dirname,
  "../../config/index.ts",
).replaceAll("\\", "/");

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { force: true, recursive: true });
});

const write = (root: string, file: string, content: string) => {
  mkdirSync(dirname(join(root, file)), { recursive: true });
  writeFileSync(join(root, file), content, "utf8");
};

const createApp = (): string => {
  const root = mkdtempSync(join(tmpdir(), "vitnode-projections-"));

  roots.push(root);
  write(
    root,
    "package.json",
    JSON.stringify({ name: "fixture-app", type: "module" }),
  );
  write(
    root,
    "node_modules/@acme/notes/package.json",
    JSON.stringify({
      exports: { "./*": "./dist/*.js" },
      name: "@acme/notes",
      type: "module",
    }),
  );
  write(
    root,
    "node_modules/@acme/notes/dist/routes.js",
    "export const routes = [];\n",
  );
  write(
    root,
    "node_modules/@acme/notes/dist/admin/nav.js",
    "export const adminNav = {};\n",
  );
  write(
    root,
    "node_modules/@acme/notes/dist/config.api.js",
    "throw new Error('the API entry was imported during frontend generation');\n",
  );
  write(
    root,
    "node_modules/@acme/quiet/package.json",
    JSON.stringify({
      exports: { "./*": "./dist/*.js" },
      name: "@acme/quiet",
      type: "module",
    }),
  );
  write(root, "src/marker.txt", "");

  return root;
};

const configSource = ({
  extraPlugin = "",
  perPage = 10,
}: { extraPlugin?: string; perPage?: number } = {}) => `
import { defineApiRuntime, definePluginFactory, defineVitNodeConfig, defineWebRuntime } from "${CORE_CONFIG}";
import { writeFileSync } from "node:fs";

const notesPlugin = definePluginFactory({
  pluginId: "@acme/notes",
  entries: {
    api: "@acme/notes/config.api",
    adminNav: "@acme/notes/admin/nav",
    routes: "@acme/notes/routes",
  },
  defaults: { perPage: 10, webhookSecret: "whsec_do_not_leak" },
  toPublicOptions: ({ perPage }) => ({ perPage }),
});

const quietPlugin = definePluginFactory({ pluginId: "@acme/quiet" });

export default defineVitNodeConfig({
  app: {
    i18n: { defaultLocale: "en", locales: [{ code: "en", name: "English" }, { code: "pl", name: "Polski" }] },
    metadata: { title: "Fixture" },
  },
  plugins: [notesPlugin({ perPage: ${String(perPage)} }), quietPlugin()${extraPlugin}],
  api: defineApiRuntime(async ({ env }) => {
    writeFileSync(new URL("./api-runtime-ran", import.meta.url), "ran");
    const { drizzle } = await import("drizzle-orm/postgres-js");
    return { dbProvider: drizzle({ connection: env.POSTGRES_URL ?? "postgresql://root:s3cret@localhost/db" }) };
  }),
  web: defineWebRuntime({
    public: { theme: { defaultTheme: "system" } },
    server: async () => {
      writeFileSync(new URL("./web-server-ran", import.meta.url), "ran");
      return { packageMessages: {} };
    },
  }),
});
`;

const generate = async (root: string) =>
  await writeGeneratedProjections(root, { appRoot: root, hostRoutesDir: null });

describe("frontend generation from the unified config", () => {
  it("writes all four projections from one plugin list", async () => {
    const root = createApp();
    write(root, "src/vitnode.config.ts", configSource());

    await generate(root);

    const paths = generatedProjectionPaths(root);

    for (const path of Object.values(paths))
      expect(existsSync(path)).toBe(true);

    const publicConfig = readFileSync(paths.publicConfig, "utf8");

    expect(publicConfig).toContain("pluginId: '@acme/notes'");
    expect(publicConfig).toContain("perPage: 10");
    expect(publicConfig).toContain("pluginId: '@acme/quiet'");
    expect(publicConfig).toContain("export type VitNodeLocale = 'en' | 'pl'");
    expect(publicConfig).not.toContain("webhookSecret");
    expect(publicConfig).not.toContain("s3cret");
    expect(publicConfig).not.toContain("drizzle");

    expect(readFileSync(paths.adminNav, "utf8")).toContain(
      "'@acme/notes/admin/nav'",
    );
    expect(readFileSync(paths.registry, "utf8")).toContain(
      "'@acme/notes/routes'",
    );
    expect(readFileSync(paths.contentRegistry, "utf8")).toContain("= []");
  });

  it("runs neither the API runtime nor the web-server runtime, and never imports the API entry", async () => {
    const root = createApp();
    write(root, "src/vitnode.config.ts", configSource());

    await generate(root);

    expect(existsSync(join(root, "src/api-runtime-ran"))).toBe(false);
    expect(existsSync(join(root, "src/web-server-ran"))).toBe(false);
  });

  it("regenerates when vitnode.config.ts changes", async () => {
    const root = createApp();
    write(root, "src/vitnode.config.ts", configSource({ perPage: 10 }));
    await generate(root);

    const { publicConfig } = generatedProjectionPaths(root);
    const before = readFileSync(publicConfig, "utf8");

    write(root, "src/vitnode.config.ts", configSource({ perPage: 25 }));
    await generate(root);

    const after = readFileSync(publicConfig, "utf8");

    expect(before).toContain("perPage: 10");
    expect(after).toContain("perPage: 25");
    expect(after).not.toBe(before);
  });

  it("skips capabilities a plugin does not provide", async () => {
    const root = createApp();
    write(root, "src/vitnode.config.ts", configSource());

    await generate(root);

    const { adminNav, contentRegistry, registry } =
      generatedProjectionPaths(root);

    expect(readFileSync(contentRegistry, "utf8")).not.toContain("@acme/notes");
    expect(readFileSync(adminNav, "utf8")).not.toContain("@acme/quiet");
    expect(readFileSync(registry, "utf8")).not.toContain("@acme/quiet");
  });

  it("fails when a declared capability does not resolve", async () => {
    const root = createApp();
    write(
      root,
      "src/vitnode.config.ts",
      configSource({
        extraPlugin: `, definePluginFactory({ pluginId: "@acme/ghost", entries: { adminContent: "@acme/ghost/admin/content" } })()`,
      }),
    );

    await expect(generate(root)).rejects.toThrow(
      /Plugin "@acme\/ghost" advertises its adminContent module at "@acme\/ghost\/admin\/content", which does not resolve/,
    );
  });

  it("reads a root-level vitnode.config.ts when the app keeps it there", async () => {
    const root = createApp();
    write(root, "vitnode.config.ts", configSource());

    await generate(root);

    expect(existsSync(generatedProjectionPaths(root).publicConfig)).toBe(true);
  });
});
