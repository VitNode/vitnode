import { UserBarAdmin } from "./user-bar/user-bar-admin";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LangSwitcherHeaderAdmin } from "./lang-switcher";
import { CONFIG } from "@/config";

export const HeaderAdmin = () => {
  return (
    <header className="h-16 fixed top-0 left-0 right-0 sm:ml-60 z-20 bg-background/75 backdrop-blur flex items-center gap-4 justify-between px-5">
      {CONFIG.node_development && (
        <div
          className="absolute top-0 left-0 w-full h-1 z-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)"
          }}
        />
      )}

      <div className="ml-auto flex items-center justify-center gap-2">
        <LangSwitcherHeaderAdmin />
        <DarkLightModeSwitcher />
        <UserBarAdmin />
      </div>
    </header>
  );
};
