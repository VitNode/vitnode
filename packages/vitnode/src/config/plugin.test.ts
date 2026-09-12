// @vitest-environment node
import { describe, expect, it } from "vitest";

import { isVitNodeConfigError } from "./errors";
import {
  definePluginFactory,
  isVitNodePluginDefinition,
  normalizePluginInput,
  pluginCapability,
} from "./plugin";

interface NotesOptions {
  apiToken?: string;
  perPage: number;
  theme: "dark" | "light";
}

const notesPlugin = definePluginFactory<NotesOptions, { perPage: number }>({
  defaults: { perPage: 10, theme: "light" },
  entries: {
    adminNav: "@acme/notes/admin/nav",
    api: "@acme/notes/config.api",
    routes: "@acme/notes/routes",
  },
  parse: options => {
    if (options.perPage < 1) throw new RangeError("perPage must be positive");

    return { ...options, theme: options.theme };
  },
  pluginId: "@acme/notes",
  toPublicOptions: ({ perPage }) => ({ perPage }),
});

describe("definePluginFactory", () => {
  it("returns a lightweight descriptor with the defaults applied", () => {
    const plugin = notesPlugin();

    expect(isVitNodePluginDefinition(plugin)).toBe(true);
    expect(plugin.pluginId).toBe("@acme/notes");
    expect(plugin.options).toEqual({ perPage: 10, theme: "light" });
    expect(Object.isFrozen(plugin)).toBe(true);
    expect(notesPlugin.pluginId).toBe("@acme/notes");
  });

  it("merges typed overrides and ignores undefined ones", () => {
    expect(notesPlugin({ perPage: 25, theme: undefined }).options).toEqual({
      perPage: 25,
      theme: "light",
    });
  });

  it("exposes only what toPublicOptions selected", () => {
    const plugin = notesPlugin({ apiToken: "s3cr3t-token", perPage: 5 });

    expect(plugin.options.apiToken).toBe("s3cr3t-token");
    expect(plugin.publicOptions).toEqual({ perPage: 5 });
    expect(JSON.stringify(plugin.publicOptions)).not.toContain("s3cr3t");
  });

  it("wraps a validation failure with the plugin id", () => {
    expect(() => notesPlugin({ perPage: 0 })).toThrow(
      /Plugin "@acme\/notes" rejected its options: perPage must be positive/,
    );
  });

  it("has no public options and convention discovery when nothing is declared", () => {
    const quiet = definePluginFactory({ pluginId: "@acme/quiet" })();

    expect(quiet.options).toEqual({});
    expect(quiet.publicOptions).toBeUndefined();
    expect(quiet.entries).toEqual({});
  });

  it.each([
    ["a function", { onSave: () => null }],
    ["a Date", { since: new Date(0) }],
    ["NaN", { ratio: Number.NaN }],
    ["a Map", { lookup: new Map() }],
  ])("refuses %s in public options", (_label, publicOptions) => {
    const factory = definePluginFactory({
      pluginId: "@acme/leaky",
      toPublicOptions: () => publicOptions as never,
    });

    expect(() => factory()).toThrow(/cannot reach a browser/);

    try {
      factory();
    } catch (error) {
      expect(
        isVitNodeConfigError(error, "public-options-not-serializable"),
      ).toBe(true);
    }
  });

  it("refuses a circular public option", () => {
    const loop: Record<string, unknown> = {};
    loop.self = loop;

    expect(() =>
      definePluginFactory({
        pluginId: "@acme/loop",
        toPublicOptions: () => loop as never,
      })(),
    ).toThrow(/circular/);
  });

  it("rejects an id that is not a package name", () => {
    expect(() => definePluginFactory({ pluginId: "../evil" })).toThrow(
      /not a package name/,
    );
  });

  it("rejects unknown or empty capability entries", () => {
    expect(() =>
      definePluginFactory({
        entries: { widgets: "@acme/x/widgets" } as never,
        pluginId: "@acme/x",
      }),
    ).toThrow(/unknown capability "widgets"/);
    expect(() =>
      definePluginFactory({ entries: { api: "" }, pluginId: "@acme/x" }),
    ).toThrow(/without a module specifier/);
  });
});

describe("pluginCapability", () => {
  it("derives every subpath by convention when nothing is overridden", () => {
    const plugin = definePluginFactory({ pluginId: "@acme/quiet" })();

    expect(pluginCapability(plugin, "api")).toEqual({
      declared: false,
      specifier: "@acme/quiet/config.api",
    });
    expect(pluginCapability(plugin, "adminContent")).toEqual({
      declared: false,
      specifier: "@acme/quiet/admin/content",
    });
  });

  /**
   * The wart this replaced: overriding one path used to mean listing every
   * other capability too, or losing it.
   */
  it("keeps the conventional subpath for capabilities an override does not name", () => {
    const plugin = definePluginFactory({
      entries: { api: "@acme/notes/server/api" },
      pluginId: "@acme/notes",
    })();

    expect(pluginCapability(plugin, "api")).toEqual({
      declared: true,
      specifier: "@acme/notes/server/api",
    });
    expect(pluginCapability(plugin, "routes")).toEqual({
      declared: false,
      specifier: "@acme/notes/routes",
    });
  });

  it("marks an overridden capability as declared, so it must resolve", () => {
    const plugin = notesPlugin();

    expect(pluginCapability(plugin, "api").declared).toBe(true);
    expect(pluginCapability(plugin, "adminContent").declared).toBe(false);
  });
});

describe("normalizePluginInput", () => {
  it("rejects a bare string and a bare id object", () => {
    expect(() => normalizePluginInput("@acme/blog", "plugins[0]")).toThrow(
      /not a VitNode plugin/,
    );
    expect(() =>
      normalizePluginInput({ pluginId: "@acme/blog" }, "plugins[0]"),
    ).toThrow(/not a VitNode plugin/);
  });
});
