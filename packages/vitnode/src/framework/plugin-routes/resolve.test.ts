// @vitest-environment node
import { describe, expect, it } from "vitest";

import { defineVitNodeConfig } from "../../config/define";
import { definePluginFactory } from "../../config/plugin";
import {
  assertPluginId,
  pluginIdsFromLoadedConfig,
  sortAndAssertUniquePlugins,
  toSingleQuotedLiteral,
} from "./resolve.js";

describe("sortAndAssertUniquePlugins", () => {
  it("orders by plugin id, not by configuration order", () => {
    expect(
      sortAndAssertUniquePlugins([
        { pluginId: "@vitnode/example", specifier: "@vitnode/example/routes" },
        { pluginId: "@acme/blog", specifier: "@acme/blog/routes" },
      ]).map(module => module.pluginId),
    ).toEqual(["@acme/blog", "@vitnode/example"]);
  });

  it("compares code units rather than using the machine's collation", () => {
    // `localeCompare` sorts "a" before "B"; a build has to be reproducible.
    expect(
      sortAndAssertUniquePlugins([
        { pluginId: "a-plugin", specifier: "a-plugin/routes" },
        { pluginId: "B-plugin", specifier: "B-plugin/routes" },
      ]).map(module => module.pluginId),
    ).toEqual(["B-plugin", "a-plugin"]);
  });

  it("does not mutate its argument", () => {
    const modules = [
      { pluginId: "b", specifier: "b/routes" },
      { pluginId: "a", specifier: "a/routes" },
    ];

    sortAndAssertUniquePlugins(modules);

    expect(modules.map(module => module.pluginId)).toEqual(["b", "a"]);
  });

  it("rejects the same plugin configured twice", () => {
    expect(() =>
      sortAndAssertUniquePlugins([
        { pluginId: "@acme/blog", specifier: "@acme/blog/routes" },
        { pluginId: "@acme/blog", specifier: "@acme/blog/routes" },
      ]),
    ).toThrow(/Two plugins claim the same id: "@acme\/blog"/);
  });

  it("has nothing to say about no plugins at all", () => {
    expect(sortAndAssertUniquePlugins([])).toEqual([]);
  });
});

describe("assertPluginId", () => {
  it.each(["@vitnode/example", "my-plugin", "a.b_c-d", "@a/b.c"])(
    "accepts %s, which npm does",
    pluginId => {
      expect(assertPluginId(pluginId, "vitnode.config.ts")).toBe(pluginId);
    },
  );

  it.each([
    "../escape",
    "with space",
    "quote'd",
    "back\\slash",
    "",
    "@scope",
    "@scope/",
  ])("rejects %j, which an import specifier may not contain", pluginId => {
    expect(() => assertPluginId(pluginId, "vitnode.config.ts")).toThrow(
      /which is not a package name/,
    );
  });
});

describe("toSingleQuotedLiteral", () => {
  it.each([
    ["plain", "'plain'"],
    ["it's", "'it\\'s'"],
    ["back\\slash", "'back\\\\slash'"],
    ["line\nbreak", "'line\\nbreak'"],
  ])("escapes %j", (value, expected) => {
    expect(toSingleQuotedLiteral(value)).toBe(expected);
  });

  it("produces a literal that evaluates back to the original", () => {
    const value = "a'b\\c\nd";

    expect(eval(toSingleQuotedLiteral(value))).toBe(value);
  });
});

describe("pluginIdsFromLoadedConfig", () => {
  const app = {
    i18n: { defaultLocale: "en", locales: [{ code: "en", name: "English" }] },
    metadata: { title: "Fixture" },
  };
  const plugin = (pluginId: string) => definePluginFactory({ pluginId })();

  it("reads the configured plugin ids in the configured order", () => {
    expect(
      pluginIdsFromLoadedConfig(
        {
          default: defineVitNodeConfig({
            app,
            plugins: [plugin("@vitnode/example"), plugin("@acme/blog")],
          }),
        },
        "src/vitnode.config.ts",
      ),
    ).toEqual(["@vitnode/example", "@acme/blog"]);
  });

  it("accepts an app with no plugins", () => {
    expect(
      pluginIdsFromLoadedConfig(
        { default: defineVitNodeConfig({ app }) },
        "src/vitnode.config.ts",
      ),
    ).toEqual([]);
  });

  it.each([
    [undefined, /did not evaluate to a module/],
    [{}, /does not export a VitNode config/],
    [{ vitNodeConfig: { plugins: [] } }, /Replace `buildConfig`/],
    [{ default: { plugins: [] } }, /built by `defineVitNodeConfig`/],
  ])("rejects %j", (loaded, message) => {
    expect(() =>
      pluginIdsFromLoadedConfig(loaded, "src/vitnode.config.ts"),
    ).toThrow(message);
  });
});
