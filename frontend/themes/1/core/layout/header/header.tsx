import { Link } from "@/i18n";
import { UserBar } from "./user-bar/user-bar";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";
import { LogoVitNode } from "@/components/logo-vitnode";
import { ThemeSwitcher } from "@/components/switchers/theme/theme-switcher";
import { Nav } from "../nav/nav";

export const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-20 w-full border-b bg-card/75 backdrop-blur">
      <div className="container flex items-center gap-4 justify-between h-16">
        <Link href="/">
          <LogoVitNode className="h-10" />
        </Link>

        <Nav />

        <div className="ml-auto sm:flex gap-2 hidden">
          <ThemeSwitcher />
          <DarkLightModeSwitcher />
          <LanguageSwitcher />I
        </div>

        <UserBar />
      </div>
    </header>
  );
};
