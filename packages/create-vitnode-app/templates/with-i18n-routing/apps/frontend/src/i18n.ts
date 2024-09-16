import { getRequestConfig } from 'next-intl/server';
import { i18nConfig } from 'vitnode-frontend/i18n';

export default getRequestConfig(async ({ locale }) => {
  const config = await i18nConfig({
    locale,
    pathsToMessagesFromPlugins: async ({ plugin, locale }) => {
      return import(`./plugins/${plugin}/langs/${locale}.json`);
    },
  });

  return config;
});
