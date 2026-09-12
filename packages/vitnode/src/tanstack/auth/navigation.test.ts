import { afterEach, describe, expect, it } from "vitest";

import { configureIntl, resetIntlRuntime } from "../i18n";
import { internalDestination } from "./navigation";

const configure = () => {
  configureIntl({
    fetchMessages: async () =>
      await Promise.resolve({ locale: "en", messages: {} }),
    i18n: {
      defaultLocale: "en",
      locales: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" },
      ],
    },
  });
};

afterEach(() => {
  resetIntlRuntime();
});

describe("internalDestination", () => {
  it("hands the router a path the route tree knows, without the locale", () => {
    configure();

    expect(internalDestination("/pl/discover")).toEqual({ to: "/discover" });
  });

  it("keeps the query and the hash apart from the path", () => {
    configure();

    expect(internalDestination("/pl/search?q=hello#top")).toEqual({
      hash: "top",
      search: { q: "hello" },
      to: "/search",
    });
  });

  it("leaves a path that carries no locale alone", () => {
    configure();

    expect(internalDestination("/admin/core")).toEqual({ to: "/admin/core" });
  });

  it("fails loudly when the application configured no languages", () => {
    expect(() => internalDestination("/discover")).toThrow(
      /i18n is not configured/,
    );
  });
});
