import { useTranslations } from 'next-intl';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSignIn } from './form/form-sign-in';
import { Link } from '@/i18n';

export const SignInView = () => {
  const t = useTranslations('core.sign_in');

  return (
    <div className="max-w-[32rem] mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>
            {t.rich('desc', {
              link: () => <Link href="/register">{t('sign_up')}</Link>
            })}
          </CardDescription>
        </CardHeader>
        <FormSignIn />
      </Card>
    </div>
  );
};
