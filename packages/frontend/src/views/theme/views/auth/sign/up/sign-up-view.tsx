import { useTranslations } from 'next-intl';

import { FormSignUp } from './form/form-sign-up';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/navigation';

export const SignUpView = () => {
  const t = useTranslations('core.sign_up');

  return (
    <div className="mx-auto max-w-lg py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>
            {t.rich('desc', {
              link: () => <Link href="/login">{t('sign_in')}</Link>,
            })}
          </CardDescription>
        </CardHeader>

        <FormSignUp />
      </Card>
    </div>
  );
};
