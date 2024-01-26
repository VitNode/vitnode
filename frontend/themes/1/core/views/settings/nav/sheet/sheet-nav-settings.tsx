import { useTranslations } from 'next-intl';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { buttonVariants } from '@/components/ui/button';
import { cx } from '@/functions/classnames';
import { ItemNavSettings } from '../item/item-nav-settings';
import { useSettingsView } from '@/hooks/core/settings/use-settings-view';

export const SheetNavSettings = () => {
  const t = useTranslations('core');
  const { navItems } = useSettingsView();

  return (
    <div className="lg:hidden block">
      <Sheet>
        <SheetTrigger className={cx(buttonVariants({ variant: 'ghost' }), 'w-full')}>
          {t('settings.open_sheet')}
        </SheetTrigger>

        <SheetContent side="bottom">
          <div className="flex flex-col mt-5">
            {navItems.map(item => (
              <SheetClose asChild key={item.href}>
                <ItemNavSettings {...item} />
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
