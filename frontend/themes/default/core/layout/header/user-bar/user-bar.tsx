'use client';

import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { AuthUserBar } from './auth/auth-user-bar';
import { cx } from '@/functions/classnames';
import { useSession } from '@/hooks/core/use-session';
import { Link } from '@/i18n';

export const UserBar = () => {
  const t = useTranslations('core');
  const { session } = useSession();

  if (session) {
    return <AuthUserBar />;
  }

  return (
    <div className="hidden gap-4 items-center justify-center sm:flex">
      <Link
        href="/login"
        className={cx(
          buttonVariants({
            size: 'sm',
            variant: 'outline'
          })
        )}
      >
        {t('user-bar.sign_in')}
      </Link>

      <Link
        href="/register"
        className={cx(
          buttonVariants({
            size: 'sm'
          })
        )}
      >
        {t('user-bar.sign_up')}
      </Link>
    </div>
  );
};
