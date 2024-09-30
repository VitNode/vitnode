import { CardDescription, CardTitle } from '@/components/ui/card';
import { getSessionData } from '@/graphql/get-session-data';
import { Link } from '@/navigation';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { FormSignUp } from './form/form-sign-up';
import { SignUpWrapper } from './wrapper';

export const generateMetadataSignUp = async (): Promise<Metadata> => {
  const t = await getTranslations('core.sign_up');

  return {
    title: t('title'),
  };
};

export const SignUpView = async () => {
  const [
    t,
    {
      core_middleware__show: {
        authorization: { lock_register },
      },
    },
  ] = await Promise.all([getTranslations('core.sign_up'), getSessionData()]);

  if (lock_register) {
    return notFound();
  }

  return (
    <SignUpWrapper>
      <div className="container mx-auto max-w-md pt-10">
        <div className="mb-10 space-y-1 text-center">
          <CardTitle className="text-3xl">{t('title')}</CardTitle>
          <CardDescription>
            {t.rich('desc', {
              link: () => <Link href="/login">{t('sign_in')}</Link>,
            })}
          </CardDescription>
        </div>

        <FormSignUp />
      </div>
    </SignUpWrapper>
  );
};
