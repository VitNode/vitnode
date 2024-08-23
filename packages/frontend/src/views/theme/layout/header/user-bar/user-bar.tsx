import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { cn } from '@/helpers/classnames';

export const UserBar = ({ className }: { className?: string }) => {
  const t = useTranslations('core');

  return (
    <div
      className={cn(
        'hidden items-center justify-center gap-4 sm:flex',
        className,
      )}
    >
      <Link
        href="/login"
        className={buttonVariants({
          size: 'sm',
          variant: 'outline',
        })}
      >
        {t('user-bar.sign_in')}
      </Link>

      <Link
        href="/register"
        className={buttonVariants({
          size: 'sm',
        })}
      >
        {t('user-bar.sign_up')}
      </Link>
    </div>
  );
};
