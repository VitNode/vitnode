import { DrawerNavSettings } from "./drawer";
import { ItemNavSettings } from "./item/item-nav-settings";
import { useSettingsView } from "@/plugins/core/hooks/settings/use-settings-view";

export const NavSettings = () => {
  const { navItems } = useSettingsView();

  return (
    <aside className="lg:w-64 h-fit lg:bg-transparent lg:border-none border bg-card rounded-md">
      <div className="lg:flex flex-col hidden gap-1">
        {navItems.map(item => (
          <ItemNavSettings key={item.href} {...item} />
        ))}
      </div>

      <DrawerNavSettings />
    </aside>
  );
};
