import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { UserBarAdmin } from './user-bar/user-bar-admin';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';

export const HeaderAdmin = () => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 sm:ml-60 z-20 bg-background/75 backdrop-blur flex items-center gap-4 justify-between px-5">
      {process.env.NODE_ENV === 'development' && (
        <div
          className="absolute top-0 left-0 w-full h-1 z-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)'
          }}
        />
      )}

      <div className="ml-auto flex items-center justify-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <UserBarAdmin />
      </div>
    </header>
  );
};
