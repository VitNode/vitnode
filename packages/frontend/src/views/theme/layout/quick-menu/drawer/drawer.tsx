import { Button, buttonVariants } from '@/components/ui/button';
import { DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/helpers/classnames';
import { useSignOutApi } from '@/hooks/core/sign/out/use-sign-out-api';
import { useSession } from '@/hooks/use-session';
import { Link } from '@/navigation';
import { KeyRound, LogOut, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { HeaderDrawerQuickMenu } from './header';
import { NavDrawerQuickMenu } from './nav/nav';

export const classNameDrawerQuickMenu =
  'w-full justify-start [&>svg]:text-muted-foreground font-normal';

export const DrawerQuickMenu = () => {
  const t = useTranslations('core');
  const { onSubmit } = useSignOutApi();
  const { session } = useSession();

  return (
    <DrawerContent>
      <HeaderDrawerQuickMenu />

      {session && (
        <div className="flex flex-col px-2">
          <DrawerClose asChild>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: classNameDrawerQuickMenu,
                }),
              )}
              href={`/profile/${session.name_seo}`}
            >
              <User />
              <span>{t('user-bar.my_profile')}</span>
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: classNameDrawerQuickMenu,
                }),
              )}
              href="/settings/overview"
            >
              <Settings />
              <span>{t('user-bar.settings')}</span>
            </Link>
          </DrawerClose>

          <Separator className="my-2" />
        </div>
      )}

      <NavDrawerQuickMenu />

      {session && (
        <div className="flex flex-col px-2 pb-5">
          {session.is_admin && (
            <DrawerClose asChild>
              <Button
                className={classNameDrawerQuickMenu}
                onClick={() => window.open('/admin', '_blank')}
                variant="ghost"
              >
                <KeyRound />
                <span>{t('user-bar.admin_cp')}</span>
              </Button>
            </DrawerClose>
          )}

          {(session.is_admin || session.is_mod) && (
            <Separator className="my-2" />
          )}

          <DrawerClose asChild>
            <Button
              className={classNameDrawerQuickMenu}
              onClick={onSubmit}
              variant="ghost"
            >
              <LogOut /> <span>{t('user-bar.log_out')}</span>
            </Button>
          </DrawerClose>
        </div>
      )}
    </DrawerContent>
  );
};
