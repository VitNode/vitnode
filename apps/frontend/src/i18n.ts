import { getRequestConfig } from 'next-intl/server';
import { i18nConfigVitNode } from 'vitnode-frontend/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  return await i18nConfigVitNode({
    pathsToMessagesFromPlugins: async ({ plugin, locale }) => {
      return await import(`./plugins/${plugin}/langs/${locale}.json`);
    },
    requestLocale,
  });
});
