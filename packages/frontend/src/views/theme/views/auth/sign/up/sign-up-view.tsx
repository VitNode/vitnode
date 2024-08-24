import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/navigation';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { FormSignUp } from './form/form-sign-up';

export const generateMetadataSignUp = async (): Promise<Metadata> => {
  const t = await getTranslations('core.sign_up');

  return {
    title: t('title'),
  };
};

export const SignUpView = () => {
  const t = useTranslations('core.sign_up');

  return (
    <div className="container mx-auto max-w-lg pt-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>
            {t.rich('desc', {
              link: () => <Link href="/login">{t('sign_in')}</Link>,
            })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormSignUp />
        </CardContent>
      </Card>
    </div>
  );
};
