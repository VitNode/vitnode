import { Button } from '@/components/ui/button';
import { Link, redirect } from '@/navigation';
import { CircleCheckIcon } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadataConfirmEmailSignUp: Metadata = {
  robots: 'noindex, nofollow',
};

export const ConfirmEmailSignUpView = async ({
  searchParams: { userId, token },
}: {
  searchParams: {
    token?: string;
    userId?: string;
  };
}) => {
  const t = await getTranslations('core.sign_up.confirm_email');
  if (!userId || !token) {
    redirect('/');
  }

  return (
    <div className="bg-background container flex max-w-xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
      <CircleCheckIcon className="mx-auto size-16 text-green-500" />
      <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mt-4">{t('desc')}</p>

      <Button asChild className="mt-6" size="lg">
        <Link href="/login">{t('sign_in')}</Link>
      </Button>
    </div>
  );
};
