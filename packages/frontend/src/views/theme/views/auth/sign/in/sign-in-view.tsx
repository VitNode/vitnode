import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { FormSignIn } from './form/form-sign-in';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/navigation';

export const generateMetadataSignIn = async (): Promise<Metadata> => {
  const t = await getTranslations('core.sign_in');

  return {
    title: t('title'),
  };
};

export const SignInView = () => {
  const t = useTranslations('core.sign_in');

  return (
    <div className="container mx-auto max-w-lg pt-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t('title')}</CardTitle>
          <CardDescription>
            {t.rich('desc', {
              link: () => <Link href="/register">{t('sign_up')}</Link>,
            })}
          </CardDescription>
        </CardHeader>
        <FormSignIn />
      </Card>
    </div>
  );
};
