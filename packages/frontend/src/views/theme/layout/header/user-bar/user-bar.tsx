import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

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
        className={buttonVariants({
          size: 'sm',
          variant: 'outline',
        })}
        href="/login"
      >
        {t('user-bar.sign_in')}
      </Link>

      <Link
        className={buttonVariants({
          size: 'sm',
        })}
        href="/register"
      >
        {t('user-bar.sign_up')}
      </Link>
    </div>
  );
};
