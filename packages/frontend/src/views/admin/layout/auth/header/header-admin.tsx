import { UserBarAdmin } from './user-bar/user-bar-admin';
import { NavAdmin } from '../nav/nav-admin';

import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { LogoVitNode } from '@/components/logo-vitnode';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';

export const HeaderAdmin = () => {
  return (
    <header className="bg-card/75 fixed left-80 right-0 top-0 z-20 flex h-16 border-b backdrop-blur">
      {CONFIG.node_development && (
        <div
          className="absolute left-0 top-0 z-50 h-1 w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)',
          }}
        />
      )}

      <div className="flex h-full items-center pl-5 sm:w-64">
        <Link href="/admin/core/dashboard">
          <LogoVitNode className="hidden h-8 sm:block" />
          <LogoVitNode className="h-8 sm:hidden" shrink />
        </Link>
      </div>

      <div className="flex h-full flex-1 items-center gap-5 px-5">
        <div className="ml-auto flex items-center justify-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserBarAdmin navComponent={<NavAdmin />} />
        </div>
      </div>
    </header>
  );
};
