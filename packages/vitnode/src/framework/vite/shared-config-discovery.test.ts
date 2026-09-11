import { createJiti } from "jiti";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

import { configFromLoadedModule } from "../../config/loaded";
import { projectPublicConfig } from "../../config/public";
import { resolveApiConfig, resolveWebServerConfig } from "../../config/server";
import { pluginIdsFromLoadedConfig } from "../plugin-routes";

const fixtureRoot = resolve(
  import.meta.dirname,
  "../../../test-fixtures/config-split",
);
const configPath = join(fixtureRoot, "vitnode.config.ts");

const load = async (): Promise<unknown> =>
  await createJiti(pathToFileURL(join(fixtureRoot, "package.json")).href, {
    interopDefault: true,
    moduleCache: false,
  }).import(configPath);

describe("the authored config is build-time cheap", () => {
  it("discovers every configured plugin id, in configuration order", async () => {
    expect(
      pluginIdsFromLoadedConfig(await load(), "vitnode.config.ts"),
    ).toEqual(["@acme/blog", "@acme/docs"]);
  });

  it("loads and projects without running either runtime", async () => {
    const config = configFromLoadedModule(await load(), "vitnode.config.ts");

    expect(projectPublicConfig(config)).toMatchObject({
      i18n: { defaultLocale: "en" },
      metadata: { title: "Fixture" },
      plugins: [{ pluginId: "@acme/blog" }, { pluginId: "@acme/docs" }],
    });
  });

  it("would have noticed - the runtimes really do throw when asked for", async () => {
    const config = configFromLoadedModule(await load(), "vitnode.config.ts");

    await expect(resolveApiConfig(config)).rejects.toThrow(
      "the API runtime was loaded",
    );
    await expect(resolveWebServerConfig(config)).rejects.toThrow(
      "the web-server runtime was loaded",
    );
  });

  it("carries the locale declaration the rest of the app reads", async () => {
    const { i18n } = projectPublicConfig(
      configFromLoadedModule(await load(), "vitnode.config.ts"),
    );

    expect(i18n.defaultLocale).toBe("en");
    expect(i18n.locales.map(locale => locale.code)).toEqual(["en", "pl"]);
  });
});
