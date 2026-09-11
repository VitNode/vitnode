import {
  defineApiRuntime,
  definePluginFactory,
  defineVitNodeConfig,
  defineWebRuntime,
} from "../../src/config";

const blogPlugin = definePluginFactory({ pluginId: "@acme/blog" });

const docsPlugin = definePluginFactory({ pluginId: "@acme/docs" });

export default defineVitNodeConfig({
  api: defineApiRuntime(() => {
    throw new Error("the API runtime was loaded");
  }),
  app: {
    i18n: {
      defaultLocale: "en",
      locales: [
        { code: "en", name: "English" },
        { code: "pl", name: "Polski" },
      ],
      timeZone: "UTC",
    },
    metadata: { shortTitle: "Fixture", title: "Fixture" },
  },
  plugins: [blogPlugin(), docsPlugin()],
  web: defineWebRuntime({
    server: () => {
      throw new Error("the web-server runtime was loaded");
    },
  }),
});
