'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { CircleCheckIcon, LogIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { SignUpContext } from './use-sign-up';

export const SignUpWrapper = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations('core.sign_up.form.success');
  const [emailSuccess, setEmailSuccess] = React.useState('');

  if (!emailSuccess) {
    return (
      <SignUpContext.Provider value={{ setEmailSuccess }}>
        {children}
      </SignUpContext.Provider>
    );
  }

  return (
    <div className="bg-background container flex max-w-xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <CircleCheckIcon className="mx-auto size-16 text-green-500" />
      <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mt-4">
        {t.rich('desc', {
          email: () => (
            <span className="text-primary font-semibold">{emailSuccess}</span>
          ),
        })}
      </p>

      <div className="mt-6">
        <Button asChild size="lg">
          <Link href="/login">
            <LogIn />
            {t('sign_in')}
          </Link>
        </Button>
      </div>
    </div>
  );
};
