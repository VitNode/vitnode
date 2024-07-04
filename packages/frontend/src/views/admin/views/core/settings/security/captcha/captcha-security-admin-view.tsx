import { useTranslations } from 'next-intl';

import { ContentCaptchaSecurityAdmin } from './content';

import { HeaderContent } from '../../../../../../../components/ui/header-content';
import { Card, CardContent } from '../../../../../../../components/ui/card';

export const CaptchaSecurityAdminView = () => {
  const t = useTranslations('admin.core.settings.security.captcha');

  return (
    <>
      <HeaderContent h1={t('title')} desc={t('desc')} />

      <Card>
        <CardContent className="p-6">
          <ContentCaptchaSecurityAdmin />
        </CardContent>
      </Card>
    </>
  );
};
