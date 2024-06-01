import { Link } from "@/utils/i18n";
import { UserBar } from "./user-bar/user-bar";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";
import { ThemeSwitcher } from "@/components/switchers/theme/theme-switcher";
import { Nav } from "../nav/nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 w-full transition-colors border-b bg-background/75 backdrop-blur">
      <div className="flex items-center gap-5 h-16 container px-5">
        <Link href="/">Logo</Link>

        <Nav />

        <div className="ml-auto sm:flex gap-2 hidden">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <DarkLightModeSwitcher />
        </div>

        <UserBar />
      </div>
    </header>
  );
};
