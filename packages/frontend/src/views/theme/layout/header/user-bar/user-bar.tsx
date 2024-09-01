import { buttonVariants } from '@/components/ui/button';
import { getSessionData } from '@/graphql/get-session-data';
import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export const UserBar = async ({ className }: { className?: string }) => {
  const [
    t,
    {
      core_middleware__show: {
        authorization: { lock_register },
      },
    },
  ] = await Promise.all([getTranslations('core'), getSessionData()]);

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

      {!lock_register && (
        <Link
          className={buttonVariants({
            size: 'sm',
          })}
          href="/register"
        >
          {t('user-bar.sign_up')}
        </Link>
      )}
    </div>
  );
};
