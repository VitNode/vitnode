'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AvatarUser } from '@/components/ui/user/avatar';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { Home, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { mutationApi } from '../../aside/hooks/mutation-api';
import { ItemDrawerHeaderAdmin } from './item';

export const DrawerHeaderAdmin = ({
  navComponent,
}: {
  navComponent: React.ReactNode;
}) => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const [open, setOpen] = React.useState(false);
  const { session } = useSessionAdmin();
  if (!session) return null;
  const { email, name } = session;

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          ariaLabel=""
          className="flex shrink-0 rounded-full"
          size="icon"
          variant="ghost"
        >
          <AvatarUser sizeInRem={1.75} user={session} />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="space-y-1 p-4 text-left">
          <p className="text-base font-medium leading-none">{name}</p>
          <p className="text-muted-foreground text-sm leading-none">{email}</p>
        </SheetHeader>

        <div className="space-y-2 p-2">
          {navComponent}

          <Separator className="my-2" />

          <ItemDrawerHeaderAdmin href="/" target="_blank">
            <Home /> <span>{t('home_page')}</span>
          </ItemDrawerHeaderAdmin>

          <Separator className="my-2" />

          <ItemDrawerHeaderAdmin
            onClick={async () => {
              try {
                await mutationApi();
              } catch (_) {
                toast.error(tCore('errors.title'), {
                  description: tCore('errors.internal_server_error'),
                });
              }
            }}
          >
            <LogOut /> <span>{tCore('user-bar.log_out')}</span>
          </ItemDrawerHeaderAdmin>
        </div>
      </SheetContent>
    </Sheet>
  );
};
