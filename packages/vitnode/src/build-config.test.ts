import { describe, expect, it } from "vitest";

import type { VitNodeConfig } from "./vitnode.config";

import { buildConfig } from "./vitnode.config";

const args = (i18n: Partial<VitNodeConfig["i18n"]> = {}): VitNodeConfig => ({
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", name: "English" }],
    ...i18n,
  },
  metadata: { shortTitle: "VitNode", title: "VitNode" },
  plugins: [],
});

describe("buildConfig", () => {
  it("gives an app that declares no time zone a deterministic one", () => {
    expect(buildConfig(args()).i18n.timeZone).toBe("UTC");
  });

  it("keeps the app's own", () => {
    expect(buildConfig(args({ timeZone: "Europe/Warsaw" })).i18n.timeZone).toBe(
      "Europe/Warsaw",
    );
  });

  it("defaults the locale prefix without touching a declared one", () => {
    expect(buildConfig(args()).i18n.localePrefix).toBe("as-needed");
    expect(
      buildConfig(args({ localePrefix: "always" })).i18n.localePrefix,
    ).toBe("always");
  });
});
