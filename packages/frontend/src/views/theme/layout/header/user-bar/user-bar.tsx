import { useTranslations } from 'next-intl';

import { buttonVariants } from '../../../../../components/ui/button';
import { Link } from '../../../../../navigation';

export const UserBar = () => {
  const t = useTranslations('core');

  return (
    <div className="hidden items-center justify-center gap-4 sm:flex">
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
