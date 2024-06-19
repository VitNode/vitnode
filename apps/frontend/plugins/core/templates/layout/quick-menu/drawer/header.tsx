import { useTranslations } from "next-intl";
import { Link } from "@vitnode/frontend/navigation";

import { buttonVariants } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { useSession } from "@/plugins/core/hooks/use-session";
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

        <div className="mt-5 flex justify-center gap-2">
          <LanguageSwitcher />
          <DarkLightModeSwitcher />
        </div>
      </div>
    );

  const { email, name, ...rest } = session;

  return (
    <div className="flex items-center justify-between gap-2 p-5">
      <div className="flex flex-row items-center gap-2 space-y-0 text-left">
        <AvatarUser user={{ name, ...rest }} sizeInRem={1.75} />
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium leading-none">{name}</p>
          <p className="text-muted-foreground text-sm leading-none">{email}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <LanguageSwitcher />
        <DarkLightModeSwitcher />
      </div>
    </div>
  );
};
