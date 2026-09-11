// @vitest-environment node
import { describe, expect, it } from "vitest";

import { defineVitNodeConfig } from "./define";
import { configFromLoadedModule } from "./loaded";

const app = {
  i18n: { defaultLocale: "en", locales: [{ code: "en", name: "English" }] },
  metadata: { title: "Fixture" },
};

describe("configFromLoadedModule", () => {
  const config = defineVitNodeConfig({ app });

  it("returns a unified default export as is", () => {
    expect(configFromLoadedModule({ default: config }, "x")).toBe(config);
  });

  it("unwraps jiti's interop namespace", () => {
    expect(configFromLoadedModule({ default: { default: config } }, "x")).toBe(
      config,
    );
  });

  it("names the old builders when it meets a legacy config", () => {
    expect(() =>
      configFromLoadedModule({ vitNodeConfig: { plugins: [] } }, "x"),
    ).toThrow(
      /Replace `buildConfig`, `buildServerConfig` and `buildApiConfig`/,
    );
    expect(() =>
      configFromLoadedModule({ default: { plugins: [] } }, "x"),
    ).toThrow(/built by `defineVitNodeConfig`/);
  });

  it("rejects a module with no config at all", () => {
    expect(() => configFromLoadedModule({}, "x")).toThrow(
      /does not export a VitNode config/,
    );
    expect(() => configFromLoadedModule(undefined, "x")).toThrow(
      /did not evaluate to a module/,
    );
  });
});
