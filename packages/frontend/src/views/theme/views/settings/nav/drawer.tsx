import { buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useTranslations } from 'next-intl';

import { useSettingsView } from './hooks/use-settings-view';
import { ItemNavSettings } from './item/item-nav-settings';

export const DrawerNavSettings = () => {
  const t = useTranslations('core');
  const { navItems } = useSettingsView();

  return (
    <Drawer>
      <DrawerTrigger
        className={buttonVariants({ variant: 'ghost', className: 'w-full' })}
      >
        {t('settings.open_sheet')}
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
  );
};
