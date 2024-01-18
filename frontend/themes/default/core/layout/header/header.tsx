import { Link } from '@/i18n';
import { UserBar } from './user-bar/user-bar';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { LogoVitNode } from '@/components/logo-vitnode';

export const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full border-b bg-card/75 backdrop-blur">
      <div className="container flex items-center gap-4 justify-between h-16">
        <Link href="/">
          <LogoVitNode className="h-10" />
        </Link>

        <div className="ml-auto flex gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        <UserBar />
      </div>
    </header>
  );
};
