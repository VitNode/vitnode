import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const UserBar = () => {
  const t = useTranslations('core');

  return (
    <div className="hidden gap-4 items-center justify-center sm:flex">
      <Link
        href="/login"
        className={cn(
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
        className={cn(
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
