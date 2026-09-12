// @vitest-environment node
import { describe, expect, it } from "vitest";

import type { LocaleConfig } from "../lib/i18n/types";

import {
  defineApiRuntime,
  defineVitNodeConfig,
  defineWebRuntime,
  hasApiRuntime,
  hasWebRuntime,
  isVitNodeConfig,
  pluginIdsOf,
} from "./define";
import { isVitNodeConfigError } from "./errors";
import { definePluginFactory } from "./plugin";

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

const acmeBlog = definePluginFactory({ pluginId: "@acme/blog" });

describe("defineVitNodeConfig", () => {
  it("fills in the i18n defaults and brands the result", () => {
    const config = defineVitNodeConfig({ app });

    expect(isVitNodeConfig(config)).toBe(true);
    expect(config.app.i18n.localePrefix).toBe("as-needed");
    expect(config.app.i18n.timeZone).toBe("UTC");
    expect(config.plugins).toEqual([]);
    expect(Object.isFrozen(config)).toBe(true);
  });

  it("keeps an explicit locale prefix and time zone", () => {
    const config = defineVitNodeConfig({
      app: {
        ...app,
        i18n: {
          ...app.i18n,
          localePrefix: "always",
          timeZone: "Europe/Warsaw",
        },
      },
    });

    expect(config.app.i18n.localePrefix).toBe("always");
    expect(config.app.i18n.timeZone).toBe("Europe/Warsaw");
  });

  it("records which runtimes the deployment declares", () => {
    const fullstack = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
      web: defineWebRuntime(),
    });
    const apiOnly = defineVitNodeConfig({
      api: defineApiRuntime(() => ({ dbProvider: {} as never })),
      app,
    });
    const webOnly = defineVitNodeConfig({ app, web: defineWebRuntime() });

    expect([hasApiRuntime(fullstack), hasWebRuntime(fullstack)]).toEqual([
      true,
      true,
    ]);
    expect([hasApiRuntime(apiOnly), hasWebRuntime(apiOnly)]).toEqual([
      true,
      false,
    ]);
    expect([hasApiRuntime(webOnly), hasWebRuntime(webOnly)]).toEqual([
      false,
      true,
    ]);
  });

  it("does not run either runtime while the config is defined", () => {
    let apiCalls = 0;
    let webCalls = 0;

    defineVitNodeConfig({
      api: defineApiRuntime(() => {
        apiCalls += 1;

        return { dbProvider: {} as never };
      }),
      app,
      web: defineWebRuntime({
        server: () => {
          webCalls += 1;

          return {};
        },
      }),
    });

    expect(apiCalls).toBe(0);
    expect(webCalls).toBe(0);
  });

  it("normalizes plugin factories in configuration order", () => {
    const docs = definePluginFactory({ pluginId: "@acme/docs" });
    const config = defineVitNodeConfig({ app, plugins: [acmeBlog(), docs()] });

    expect(pluginIdsOf(config)).toEqual(["@acme/blog", "@acme/docs"]);
    expect(config.plugins.map(plugin => plugin.entries)).toEqual([{}, {}]);
  });

  it("rejects a plugin registered twice", () => {
    expect(() =>
      defineVitNodeConfig({ app, plugins: [acmeBlog(), acmeBlog()] }),
    ).toThrow(/registered twice/);

    try {
      defineVitNodeConfig({ app, plugins: [acmeBlog(), acmeBlog()] });
    } catch (error) {
      expect(isVitNodeConfigError(error, "duplicate-plugin")).toBe(true);
    }
  });

  it("rejects a default locale that is not configured", () => {
    expect(() =>
      defineVitNodeConfig({
        app: {
          ...app,
          i18n: { defaultLocale: "de", locales: app.i18n.locales },
        },
      }),
    ).toThrow(/has to be one of the configured locales/);
  });

  it("rejects an empty locale list and a missing title", () => {
    expect(() =>
      defineVitNodeConfig({
        app: {
          ...app,
          i18n: { defaultLocale: "en", locales: [] as LocaleConfig[] },
        },
      }),
    ).toThrow(/at least one locale/);
    expect(() =>
      defineVitNodeConfig({
        app: { ...app, metadata: {} as never },
      }),
    ).toThrow(/metadata\.title/);
  });

  it("rejects runtimes that were not built with their helpers", () => {
    expect(() =>
      defineVitNodeConfig({ api: { load: () => ({}) } as never, app }),
    ).toThrow(/defineApiRuntime/);
    expect(() =>
      defineVitNodeConfig({ app, web: { public: {} } as never }),
    ).toThrow(/defineWebRuntime/);
  });

  it("rejects things that are not plugins", () => {
    expect(() =>
      defineVitNodeConfig({ app, plugins: ["@acme/blog"] as unknown as never }),
    ).toThrow(/not a VitNode plugin/);
    expect(() =>
      defineVitNodeConfig({
        app,
        plugins: [{ pluginId: "@acme/blog" }] as unknown as never,
      }),
    ).toThrow(/not a VitNode plugin/);
  });
});
