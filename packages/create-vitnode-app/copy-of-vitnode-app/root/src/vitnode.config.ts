import { buildConfig } from "@vitnode/core/vitnode.config";

export const vitNodeConfig = buildConfig({
  debug: false,
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", name: "English" }],
    timeZone: "UTC",
  },
  metadata: {
    shortTitle: "VitNode",
    title: "VitNode",
  },
  plugins: [],
  theme: {
    defaultTheme: "system",
  },
});
