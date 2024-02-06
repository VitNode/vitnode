import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { useSession } from "@/hooks/core/use-session";
import { Link } from "@/i18n";
import { ThemeSwitcher } from "@/components/switchers/theme/theme-switcher";
import { DarkLightModeSwitcher } from "@/components/switchers/dark-light-mode-switcher";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";

export const HeaderDrawerQuickMenu = () => {
  const t = useTranslations("core");
  const { session } = useSession();

  if (!session)
    return (
      <div className="p-5">
        <div className="flex gap-5">
          <DrawerClose asChild>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                className: "flex-1"
              })}
            >
              {t("user-bar.sign_in")}
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              href="/register"
              className={buttonVariants({
                className: "flex-1"
              })}
            >
              {t("user-bar.sign_up")}
            </Link>
          </DrawerClose>
        </div>

        <div className="flex gap-2 mt-5 justify-center">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <DarkLightModeSwitcher />
        </div>
      </div>
    );

  const { email, name, ...rest } = session;

  return (
    <div className="p-5 py-5 flex gap-2 items-center justify-between">
      <div className="flex flex-row items-center space-y-0 gap-2 text-left">
        <AvatarUser user={{ name, ...rest }} sizeInRem={1.75} />
        <div className="flex flex-col gap-1">
          <p className="font-medium leading-none text-base">{name}</p>
          <p className="text-sm leading-none text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <DarkLightModeSwitcher />
      </div>
    </div>
  );
};
