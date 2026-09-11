// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start/server-only", () => ({}));

const { definePluginFactory, defineVitNodeConfig, defineWebRuntime } =
  await import("@/config");
const { resolveWebServerConfig } = await import("@/config/server");
const { createIntlMessagesLoader } = await import("./messages");

const messages = (tree: Record<string, unknown>) => async () =>
  await Promise.resolve({ default: tree });

const blogPlugin = definePluginFactory({ pluginId: "@acme/blog" });

const appMessages = {
  pl: { "@acme/blog": messages({ blog: { title: "Nasz blog" } }) },
};

const packageMessages = {
  "@acme/blog": {
    en: messages({ blog: { author: "Author", title: "Blog" } }),
    pl: messages({ blog: { title: "Blog (pakiet)" } }),
  },
  "@vitnode/core": { en: messages({ core: { global: { save: "Save" } } }) },
};

let serverLoads = 0;

const config = defineVitNodeConfig({
  app: {
    i18n: {
      defaultLocale: "en",
      locales: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" },
      ],
    },
    metadata: { shortTitle: "Fixture", title: "Fixture" },
  },
  plugins: [blogPlugin()],
  web: defineWebRuntime({
    server: () => {
      serverLoads += 1;

      return { messages: appMessages, packageMessages };
    },
  }),
});

const load = createIntlMessagesLoader(config);

describe("the message loader resolves against the unified config", () => {
  it("reads the plugins the config registered", async () => {
    const { messages: tree } = await load({
      locale: "en",
      namespaces: ["blog"],
    });

    expect(tree).toEqual({ blog: { author: "Author", title: "Blog" } });
  });

  it("merges the app's own overrides last", async () => {
    const { messages: tree } = await load({
      locale: "pl",
      namespaces: ["blog"],
    });

    expect(tree).toEqual({ blog: { author: "Author", title: "Nasz blog" } });
  });

  it("falls back to the config's defaultLocale key by key", async () => {
    const { messages: tree } = await load({
      locale: "pl",
      namespaces: ["blog"],
    });

    expect((tree as { blog: { author: string } }).blog.author).toBe("Author");
  });

  it("picks only the namespaces a page asked for", async () => {
    const { messages: tree } = await load({
      locale: "en",
      namespaces: ["core.global"],
    });

    expect(tree).toEqual({ core: { global: { save: "Save" } } });
  });

  it("loads the web-server runtime once, lazily", () => {
    expect(serverLoads).toBe(1);
  });

  it("is the same loader the resolved web-server config builds", async () => {
    const fromResolved = createIntlMessagesLoader(
      await resolveWebServerConfig(config),
    );

    expect(await fromResolved({ locale: "pl", namespaces: ["blog"] })).toEqual(
      await load({ locale: "pl", namespaces: ["blog"] }),
    );
  });

  it("is the same loader the four spelled-out options build", async () => {
    const explicit = createIntlMessagesLoader({
      appMessages,
      defaultLocale: config.app.i18n.defaultLocale,
      packageMessages,
      plugins: [...config.plugins],
    });

    expect(await explicit({ locale: "pl", namespaces: ["blog"] })).toEqual(
      await load({ locale: "pl", namespaces: ["blog"] }),
    );
  });

  it("needs no loaders at all", async () => {
    const bare = createIntlMessagesLoader(
      defineVitNodeConfig({ app: config.app, web: defineWebRuntime() }),
    );

    expect(await bare({ locale: "en", namespaces: ["blog"] })).toEqual({
      locale: "en",
      messages: {},
    });
  });

  it("refuses a root config without a web runtime", async () => {
    const apiOnly = createIntlMessagesLoader(
      defineVitNodeConfig({ app: config.app }),
    );

    await expect(
      apiOnly({ locale: "en", namespaces: ["blog"] }),
    ).rejects.toThrow(/no web runtime/);
  });
});
