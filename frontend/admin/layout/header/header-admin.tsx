import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { UserBarAdmin } from './user-bar/user-bar-admin';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';

export const HeaderAdmin = () => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 sm:ml-60 z-50 bg-background/75 backdrop-blur flex items-center gap-4 justify-between px-5">
      <div className="ml-auto flex items-center justify-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <UserBarAdmin />
      </div>
    </header>
  );
};
