import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SignInView = () => {
  const t = useTranslations('core');

  return (
    <div className="max-w-[36rem] mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('sign-in.title')}</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
