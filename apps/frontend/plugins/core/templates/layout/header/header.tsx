import { Link } from "vitnode-frontend/navigation";

import { UserBar } from "./user-bar/user-bar";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";
import { Nav } from "../nav/nav";

export const Header = () => {
  return (
    <header className="bg-background/75 sticky top-0 z-20 w-full border-b backdrop-blur transition-colors">
      <div className="container flex h-16 items-center gap-5 px-5">
        <Link href="/">Logo</Link>

        <Nav />

        <div className="ml-auto hidden gap-2 sm:flex">
          <LanguageSwitcher />
          <DarkLightModeSwitcher />
        </div>

        <UserBar />
      </div>
    </header>
  );
};
