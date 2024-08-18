import { DrawerNavSettings } from './drawer';
import { useSettingsView } from './hooks/use-settings-view';
import { ItemNavSettings } from './item/item-nav-settings';

export const NavSettings = () => {
  const { navItems } = useSettingsView();

  return (
    <aside className="bg-card h-fit rounded-md border lg:w-64 lg:border-none lg:bg-transparent">
      <div className="hidden flex-col gap-2 lg:flex">
        {navItems.map(item => (
          <ItemNavSettings key={item.href} {...item} />
        ))}
      </div>

      <DrawerNavSettings />
    </aside>
  );
};
