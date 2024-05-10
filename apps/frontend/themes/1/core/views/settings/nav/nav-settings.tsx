import { DrawerNavSettings } from "./drawer";
import { ItemNavSettings } from "./item/item-nav-settings";
import { useSettingsView } from "@/hooks/core/settings/use-settings-view";

export const NavSettings = () => {
  const { navItems } = useSettingsView();

  return (
    <aside className="lg:w-72 rounded-lg border bg-card text-card-foreground shadow-sm h-fit">
      <div className="lg:flex flex-col hidden p-5">
        {navItems.map(item => (
          <ItemNavSettings key={item.href} {...item} />
        ))}
      </div>

      <DrawerNavSettings />
    </aside>
  );
};
