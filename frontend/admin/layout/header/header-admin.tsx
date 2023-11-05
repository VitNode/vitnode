import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n';
import { UserBarAdmin } from './user-bar/user-bar-admin';
import { buttonVariants } from '@/components/ui/button';
import { DrawerAdmin } from './drawer/drawer-admin';

export const HeaderAdmin = () => {
  const t = useTranslations('admin');

  return (
    <header className="h-16 fixed top-0 left-0 right-0 sm:ml-60 z-50 bg-background/75 backdrop-blur flex items-center gap-4 justify-between px-5">
      <div className="ml-auto items-center gap-4 justify-between hidden sm:flex">
        <Link href="/" className={buttonVariants({ variant: 'ghost' })} target="_blank">
          <Home />
          <span>{t('home_page')}</span>
        </Link>
        <UserBarAdmin />
      </div>

      <DrawerAdmin />
    </header>
  );
};
