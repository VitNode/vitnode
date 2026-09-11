// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

import type { ModuleImporter } from "./server";

import {
  defineApiRuntime,
  defineVitNodeConfig,
  defineWebRuntime,
} from "./define";
import { isVitNodeConfigError } from "./errors";
import { definePluginFactory } from "./plugin";
import { resolveApiConfig, resolveWebServerConfig } from "./server";

const app = {
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English" },
      { code: "pl", name: "Polski" },
    ],
  },
  metadata: { title: "Fixture" },
};

const blog = definePluginFactory<
  { postsPerPage: number },
  { postsPerPage: number }
>({
  defaults: { postsPerPage: 20 },
  entries: {
    adminContent: "@acme/blog/admin/content",
    adminNav: "@acme/blog/admin/nav",
    api: "@acme/blog/config.api",
    routes: "@acme/blog/routes",
  },
  pluginId: "@acme/blog",
  toPublicOptions: options => options,
});

const quiet = definePluginFactory({ pluginId: "@acme/quiet" });

const notFound = (specifier: string) =>
  Object.assign(new Error(`Cannot find package '${specifier}'`), {
    code: "ERR_MODULE_NOT_FOUND",
  });

const importerOver =
  (modules: Record<string, unknown>): ModuleImporter =>
  async specifier => {
    if (!(specifier in modules)) throw notFound(specifier);

    return await Promise.resolve(modules[specifier]);
  };

const blogApiModule = {
  apiPlugin: vi.fn((options: { postsPerPage: number }) => ({
    hono: {},
    options,
    pluginId: "@acme/blog",
  })),
};

const fullstack = defineVitNodeConfig({
  api: defineApiRuntime(({ env, mode }) => ({
    dbProvider: { url: env.FIXTURE_DB, mode } as never,
    redis: { url: "redis://cache" },
  })),
  app,
  plugins: [blog({ postsPerPage: 5 }), quiet()],
  web: defineWebRuntime({
    public: { theme: { defaultTheme: "dark" } },
    server: () => ({
      messages: { en: {} },
      packageMessages: { "@acme/blog": {} },
    }),
  }),
});

describe("resolveApiConfig", () => {
  it("resolves a fullstack config into the API's shape", async () => {
    const importer = vi.fn(
      importerOver({ "@acme/blog/config.api": blogApiModule }),
    );

    const api = await resolveApiConfig(fullstack, {
      context: { env: { FIXTURE_DB: "postgres://fixture" }, mode: "test" },
      importer,
    });

    expect(api.dbProvider).toEqual({ mode: "test", url: "postgres://fixture" });
    expect(api.redis).toEqual({ url: "redis://cache" });
    expect(api.i18n).toBe(fullstack.app.i18n);
    expect(api.metadata).toBe(fullstack.app.metadata);
    expect(api.plugins.map(plugin => plugin.pluginId)).toEqual(["@acme/blog"]);
    expect(blogApiModule.apiPlugin).toHaveBeenCalledWith(
      { postsPerPage: 5 },
      expect.objectContaining({ mode: "test" }),
    );
    expect(api.public).toMatchObject({
      metadata: { title: "Fixture" },
      plugins: [
        { pluginId: "@acme/blog", publicOptions: { postsPerPage: 5 } },
        { pluginId: "@acme/quiet" },
      ],
      theme: { defaultTheme: "dark" },
    });
  });

  it("imports only API entries, never a frontend capability", async () => {
    const importer = vi.fn(
      importerOver({ "@acme/blog/config.api": blogApiModule }),
    );

    await resolveApiConfig(fullstack, { importer });

    const specifiers = importer.mock.calls.map(([specifier]) => specifier);

    expect(specifiers).toEqual([
      "@acme/blog/config.api",
      "@acme/quiet/config.api",
    ]);
    expect(specifiers.some(specifier => /routes|admin\//.test(specifier))).toBe(
      false,
    );
  });

  it("does not load the web-server runtime", async () => {
    const server = vi.fn(() => ({}));
    const config = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
      web: defineWebRuntime({ server }),
    });

    await resolveApiConfig(config, { importer: importerOver({}) });

    expect(server).not.toHaveBeenCalled();
  });

  it("skips a convention plugin whose API module does not exist", async () => {
    const config = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
      plugins: [quiet()],
    });

    const api = await resolveApiConfig(config, { importer: importerOver({}) });

    expect(api.plugins).toEqual([]);
  });

  it("skips a convention plugin whose module has no apiPlugin export", async () => {
    const config = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
      plugins: [quiet()],
    });

    const api = await resolveApiConfig(config, {
      importer: importerOver({
        "@acme/quiet/config.api": { somethingElse: 1 },
      }),
    });

    expect(api.plugins).toEqual([]);
  });

  it("fails when a declared API entry cannot be imported", async () => {
    await expect(
      resolveApiConfig(fullstack, { importer: importerOver({}) }),
    ).rejects.toThrow(
      /advertises its API at "@acme\/blog\/config\.api", which could not be imported/,
    );
  });

  it("fails when a declared API entry has no apiPlugin export", async () => {
    await expect(
      resolveApiConfig(fullstack, {
        importer: importerOver({
          "@acme/blog/config.api": { blogApiPlugin: () => 1 },
        }),
      }),
    ).rejects.toThrow(/does not export `apiPlugin`/);
  });

  it("fails when the entry builds a plugin for another id", async () => {
    await expect(
      resolveApiConfig(fullstack, {
        importer: importerOver({
          "@acme/blog/config.api": {
            apiPlugin: () => ({ hono: {}, pluginId: "@acme/other" }),
          },
        }),
      }),
    ).rejects.toThrow(/built an API plugin for "@acme\/other"/);
  });

  it("rethrows a failure inside the API module rather than skipping it", async () => {
    await expect(
      resolveApiConfig(fullstack, {
        importer: async () =>
          await Promise.reject(new Error("drizzle exploded")),
      }),
    ).rejects.toThrow(/drizzle exploded/);
  });

  it("requires a dbProvider from the runtime", async () => {
    const config = defineVitNodeConfig({
      api: defineApiRuntime(() => ({}) as never),
      app,
    });

    await expect(resolveApiConfig(config)).rejects.toThrow(/dbProvider/);
  });

  it("rejects a web-only config", async () => {
    const webOnly = defineVitNodeConfig({ app, web: defineWebRuntime() });

    try {
      await resolveApiConfig(webOnly);
      expect.unreachable();
    } catch (error) {
      expect(isVitNodeConfigError(error, "api-runtime-missing")).toBe(true);
      expect(String(error)).toContain("VITNODE_API_URL");
    }
  });
});

describe("resolveWebServerConfig", () => {
  it("resolves a fullstack config for the message loader", async () => {
    const web = await resolveWebServerConfig(fullstack);

    expect(web.kind).toBe("vitnode.web-server-config");
    expect(web.i18n).toBe(fullstack.app.i18n);
    expect(web.messages).toEqual({ en: {} });
    expect(web.packageMessages).toEqual({ "@acme/blog": {} });
    expect(web.plugins).toEqual([
      { pluginId: "@acme/blog" },
      { pluginId: "@acme/quiet" },
    ]);
  });

  it("does not load the API runtime", async () => {
    const load = vi.fn(() => ({ dbProvider: {} as never }));
    const config = defineVitNodeConfig({
      api: defineApiRuntime(load),
      app,
      web: defineWebRuntime(),
    });

    await resolveWebServerConfig(config);

    expect(load).not.toHaveBeenCalled();
  });

  it("resolves a web-only config that talks to a remote API", async () => {
    const webOnly = defineVitNodeConfig({
      app,
      plugins: [blog()],
      web: defineWebRuntime({ server: () => ({ packageMessages: {} }) }),
    });

    const web = await resolveWebServerConfig(webOnly);

    expect(web.plugins).toEqual([{ pluginId: "@acme/blog" }]);
    expect(web.packageMessages).toEqual({});
  });

  it("rejects an API-only config", async () => {
    const apiOnly = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
    });

    try {
      await resolveWebServerConfig(apiOnly);
      expect.unreachable();
    } catch (error) {
      expect(isVitNodeConfigError(error, "web-runtime-missing")).toBe(true);
    }
  });
});
