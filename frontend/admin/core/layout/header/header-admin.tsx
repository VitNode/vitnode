import { UserBarAdmin } from "./user-bar/user-bar-admin";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { CONFIG } from "@/config/config";
import { Link } from "@/i18n";
import { LogoVitNode } from "@/components/logo-vitnode";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";

export const HeaderAdmin = () => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-20 bg-card/75 border-b backdrop-blur flex">
      {CONFIG.node_development && (
        <div
          className="absolute top-0 left-0 w-full h-1 z-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)"
          }}
        />
      )}

      <div className="sm:w-64 pl-5 flex items-center justify-center h-full">
        <Link href="/admin/core/dashboard">
          <LogoVitNode className="h-8 sm:block hidden" />
          <LogoVitNode className="h-8 sm:hidden" shrink />
        </Link>
      </div>

      <div className="flex items-center gap-5 px-5 h-full flex-1">
        <div className="ml-auto flex items-center justify-center gap-2">
          <LanguageSwitcher />
          <DarkLightModeSwitcher />
          <UserBarAdmin />
        </div>
      </div>
    </header>
  );
};
