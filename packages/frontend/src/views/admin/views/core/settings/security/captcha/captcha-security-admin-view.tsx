import { Card, CardContent } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
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
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.security.captcha'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')} />

      <Card>
        <CardContent className="p-6">
          <ContentCaptchaSecurityAdmin {...data} />
        </CardContent>
      </Card>
    </>
  );
};
