import { DrawerNavSettings } from './drawer';
import { ItemNavSettings } from './item/item-nav-settings';
import { useSettingsView } from '@/plugins/core/hooks/settings/use-settings-view';

export const NavSettings = () => {
  const { navItems } = useSettingsView();

  return (
    <aside className="bg-card h-fit rounded-md border lg:w-64 lg:border-none lg:bg-transparent">
      <div className="hidden flex-col gap-1 lg:flex">
        {navItems.map(item => (
          <ItemNavSettings key={item.href} {...item} />
        ))}
      </div>

      <DrawerNavSettings />
    </aside>
  );
};
