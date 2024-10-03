import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = 'en';
  }

  const core = (await import(`@/plugins/core/langs/${locale}.json`)).default;
  const admin = (await import(`@/plugins/admin/langs/${locale}.json`)).default;
  const welcome = (await import(`@/plugins/welcome/langs/${locale}.json`))
    .default;

  return {
    locale,
    messages: {
      ...core,
      ...admin,
      ...welcome,
    },
  };
});
