import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

import { buttonVariants } from '@/components/ui/button';
import { AuthUserBar } from './auth/auth-user-bar';
import { cx } from '@/functions/classnames';

const session = true;

export const UserBar = () => {
  const t = useTranslations('core');

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
        {t('user-bar.sign-in')}
      </Link>

      <Link
        href="/register"
        className={cx(
          buttonVariants({
            size: 'sm'
          })
        )}
      >
        {t('user-bar.sign-up')}
      </Link>
    </div>
  );
};
