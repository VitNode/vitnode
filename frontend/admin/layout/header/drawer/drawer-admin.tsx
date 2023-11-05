'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeOptionsDrawerAdmin } from './options/theme-options-drawer-admin';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';
import { UserBarAdmin } from '../user-bar/user-bar-admin';

import { ListNavAdmin } from '../../nav/list/list-nav-admin';

export const DrawerAdmin = () => {
  const { session } = useSessionAdmin();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="ml-auto flex sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0">
          <SheetHeader className="p-4">
            <SheetTitle className="flex items-center justify-center gap-2">
              <ThemeOptionsDrawerAdmin />
              <UserBarAdmin drawer />
            </SheetTitle>
          </SheetHeader>

          <div className="px-4">
            <ListNavAdmin onClickItem={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
