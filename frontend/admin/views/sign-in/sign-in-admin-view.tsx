import { useTranslations } from 'next-intl';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSignInAdmin } from './form/form-sign-in-admin';

export const SignInAdminView = () => {
  const t = useTranslations('admin');

  return (
    <div className="max-w-[32rem] mx-auto my-10 py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
        </CardHeader>
        <FormSignInAdmin />
      </Card>
    </div>
  );
};
