import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/functions/classnames";
import { useSettingsView } from "@/plugins/core/hooks/settings/use-settings-view";
import { ItemNavSettings } from "./item/item-nav-settings";

export const DrawerNavSettings = () => {
  const t = useTranslations("core");
  const { navItems } = useSettingsView();

  return (
    <div className="lg:hidden block">
      <Drawer>
        <DrawerTrigger
          className={cn(buttonVariants({ variant: "ghost" }), "w-full")}
        >
          {t("settings.open_sheet")}
        </DrawerTrigger>

        <DrawerContent>
          <div className="flex flex-col p-5">
            {navItems.map(item => (
              <DrawerClose asChild key={item.href}>
                <ItemNavSettings {...item} />
              </DrawerClose>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
