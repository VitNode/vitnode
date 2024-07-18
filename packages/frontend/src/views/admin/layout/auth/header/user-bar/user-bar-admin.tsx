'use client';

import { Home, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import React from 'react';

import { ItemUserBarAdmin } from './item-user-bar-admin';
import { mutationApi } from './hooks/mutation-api';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { AvatarUser } from '@/components/ui/user/avatar';
import { Separator } from '@/components/ui/separator';

export const UserBarAdmin = ({
  navComponent,
}: {
  navComponent: React.ReactNode;
}) => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const { session } = useSessionAdmin();
  const [open, setOpen] = React.useState(false);

  if (!session) return null;
  const { email, name, ...rest } = session;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full"
          size="icon"
          ariaLabel={tCore('open_menu')}
        >
          <AvatarUser user={{ name, ...rest }} sizeInRem={2} />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="flex-row items-center gap-2 space-y-0 p-4 text-left">
          <AvatarUser user={{ name, ...rest }} sizeInRem={1.75} />
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium leading-none">{name}</p>
            <p className="text-muted-foreground text-sm leading-none">
              {email}
            </p>
          </div>
        </SheetHeader>

        <div className="block md:hidden">
          <div className="space-y-2 p-2">{navComponent}</div>

          <Separator className="my-2" />
        </div>

        <div className="px-2">
          <ItemUserBarAdmin href="/" target="_blank">
            <Home /> <span>{t('home_page')}</span>
          </ItemUserBarAdmin>

          <Separator className="my-2" />

          <ItemUserBarAdmin
            onClick={async () => {
              try {
                await mutationApi();
              } catch (error) {
                toast.error(tCore('errors.title'), {
                  description: tCore('errors.internal_server_error'),
                });
              }
            }}
          >
            <LogOut /> <span>{tCore('user-bar.log_out')}</span>
          </ItemUserBarAdmin>
        </div>
      </SheetContent>
    </Sheet>
  );
};
