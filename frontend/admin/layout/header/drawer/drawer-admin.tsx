'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { ThemeOptionsDrawerAdmin } from './options/theme-options-drawer-admin';

import { ListNavAdmin } from '../../nav/list/list-nav-admin';
import { useSessionAdmin } from '../../../hooks/use-session-admin';

export const DrawerAdmin = () => {
  const { session } = useSessionAdmin();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="flex sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0">
          <SheetHeader className="p-4">
            <SheetTitle>{session.name}</SheetTitle>
          </SheetHeader>

          <div className="px-4">
            <ListNavAdmin onClickItem={() => setOpen(false)} />
          </div>

          <SheetFooter className="sticky bottom-0 bg-card p-4 transition-colors duration-300">
            <div>
              <ThemeOptionsDrawerAdmin />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
