import { Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n';
import { UserBarAdmin } from './user-bar/user-bar-admin';
import { buttonVariants } from '@/components/ui/button';
import { DrawerAdmin } from './drawer/drawer-admin';

export const HeaderAdmin = () => {
  const t = useTranslations('admin');

  return (
    <header className="h-16 sticky top-0 z-50 bg-card backdrop-blur flex items-center gap-4 justify-between px-5">
      <Link href="/admin/core">VitNode</Link>

      <div className="items-center gap-4 justify-between hidden sm:flex">
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
