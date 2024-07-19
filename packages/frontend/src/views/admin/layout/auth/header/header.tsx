import { LogoVitNode } from '@/components/logo-vitnode';
import { Link } from '@/navigation';
import { DrawerHeaderAdmin } from './drawer/drawer';
import { NavAdmin } from '../nav/nav-admin';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';

export const HeaderAdmin = () => {
  return (
    <header className="bg-card/75 fixed left-0 right-0 top-0 z-20 flex h-16 items-center border-b px-5 backdrop-blur md:hidden">
      <Link
        href="/admin/core/dashboard"
        className="mr-auto flex h-full items-center justify-center"
      >
        <LogoVitNode className="h-8" small />
      </Link>

      <div className="flex items-center justify-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <DrawerHeaderAdmin navComponent={<NavAdmin />} />
      </div>
    </header>
  );
};
