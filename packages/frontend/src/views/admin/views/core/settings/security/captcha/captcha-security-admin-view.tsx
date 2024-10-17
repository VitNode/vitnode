import { TranslationsProvider } from '@/components/translations-provider';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import { checkPermissionSessionAdmin } from '@/graphql/get-session-admin-data';
import {
  Admin__Core_Security__Captcha__Show,
  Admin__Core_Security__Captcha__ShowQuery,
} from '@/graphql/queries/admin/security/admin__core_security__captcha__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentCaptchaSecurityAdmin } from './content';

const getData = async () => {
  const data = await fetcher<Admin__Core_Security__Captcha__ShowQuery>({
    query: Admin__Core_Security__Captcha__Show,
    cache: 'force-cache',
  });

  return data;
};

export const generateMetadataCaptchaSecurityAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.core.settings.security.captcha');

    return {
      title: t('title'),
    };
  };

export const CaptchaSecurityAdminView = async () => {
  const perm = await checkPermissionSessionAdmin({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_security',
  });
  if (perm) return perm;
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.security.captcha'),
    getData(),
  ]);

  return (
    <TranslationsProvider namespaces="admin.core.settings.security.captcha">
      <HeaderContent desc={t('desc')} h1={t('title')} />

      <Card className="p-6">
        <ContentCaptchaSecurityAdmin {...data} />
      </Card>
    </TranslationsProvider>
  );
};
