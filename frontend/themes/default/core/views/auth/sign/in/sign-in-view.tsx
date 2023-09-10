import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSignIn } from './forms/form-sign-in';

export const SignInView = () => {
  const t = useTranslations('core');

  return (
    <div className="max-w-[32rem] mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('sign-in.title')}</CardTitle>
          <CardDescription>{t('sign-in.desc')}</CardDescription>
        </CardHeader>
        <FormSignIn />
      </Card>
    </div>
  );
};
