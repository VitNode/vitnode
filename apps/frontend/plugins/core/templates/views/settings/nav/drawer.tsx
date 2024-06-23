import { useTranslations } from "next-intl";
import { cn } from "vitnode-frontend/helpers";
import {
  buttonVariants,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "vitnode-frontend/components";

import { useSettingsView } from "@/plugins/core/hooks/settings/use-settings-view";
import { ItemNavSettings } from "./item/item-nav-settings";

export const DrawerNavSettings = () => {
  const t = useTranslations("core");
  const { navItems } = useSettingsView();

  return (
    <div className="block lg:hidden">
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
