import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';

export const Footer = () => {
  return (
    <footer className="border-t bg-card/75">
      <div className="container py-3 flex items-center gap-4 justify-between">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </footer>
  );
};
