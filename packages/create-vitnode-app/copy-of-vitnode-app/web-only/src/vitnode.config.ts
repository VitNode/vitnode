import { defineVitNodeConfig, defineWebRuntime } from "@vitnode/core/config";

import { appMessages } from "./locales/app";
import { packageMessages } from "./locales/packages";

export default defineVitNodeConfig({
  app: {
    i18n: {
      defaultLocale: "en",
      locales: [{ code: "en", name: "English" }],
      timeZone: "UTC",
    },
    metadata: {
      shortTitle: "VitNode",
      title: "VitNode",
    },
  },

  plugins: [],

  web: defineWebRuntime({
    public: {
      debug: false,
      theme: {
        defaultTheme: "system",
      },
    },

    server: () => ({ messages: appMessages, packageMessages }),
  }),
});
