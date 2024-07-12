import { getTranslations } from 'next-intl/server';

import { ContentCaptchaSecurityAdmin } from './content';
import { HeaderContent } from '@/components/ui/header-content';
import { Card, CardContent } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Security__Captcha__Show,
  Admin__Core_Security__Captcha__ShowQuery,
} from '@/graphql/graphql';

const getData = async () => {
  const { data } = await fetcher<Admin__Core_Security__Captcha__ShowQuery>({
    query: Admin__Core_Security__Captcha__Show,
    cache: 'force-cache',
  });

  return data;
};

export const CaptchaSecurityAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.settings.security.captcha'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} desc={t('desc')} />

      <Card>
        <CardContent className="p-6">
          <ContentCaptchaSecurityAdmin {...data} />
        </CardContent>
      </Card>
    </>
  );
};
