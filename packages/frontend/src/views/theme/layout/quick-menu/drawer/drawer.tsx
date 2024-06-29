import { useTranslations } from 'next-intl';
import { KeyRound, LogOut, Settings, Shield, User } from 'lucide-react';
import * as React from 'react';

import { HeaderDrawerQuickMenu } from './header';
import { NavDrawerQuickMenu } from './nav/nav';

import { useSignOutApi } from '../../../../../hooks/core/sign/out/use-sign-out-api';
import { useSession } from '../../../../../hooks/use-session';
import {
  DrawerClose,
  DrawerContent,
} from '../../../../../components/ui/drawer';
import { Link } from '../../../../../navigation';
import { cn } from '../../../../../helpers/classnames';
import { Button, buttonVariants } from '../../../../../components/ui/button';
import { Separator } from '../../../../../components/ui/separator';

export const classNameDrawerQuickMenu =
  'w-full justify-start [&>svg]:text-muted-foreground font-normal';

interface Props {
  navIcons: { icon: React.ReactNode; id: number }[];
}

export const DrawerQuickMenu = ({ navIcons }: Props) => {
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
              href={`/profile/${session.name_seo}`}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: classNameDrawerQuickMenu,
                }),
              )}
            >
              <User />
              <span>{t('user-bar.my_profile')}</span>
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              href="/settings"
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: classNameDrawerQuickMenu,
                }),
              )}
            >
              <Settings />
              <span>{t('user-bar.settings')}</span>
            </Link>
          </DrawerClose>

          <Separator className="my-2" />
        </div>
      )}

      <NavDrawerQuickMenu navIcons={navIcons} />

      {session && (
        <div className="flex flex-col px-2 pb-5">
          {session.is_mod && (
            <DrawerClose asChild>
              <Link
                href="/mod"
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    className: classNameDrawerQuickMenu,
                  }),
                )}
              >
                <Shield />
                <span>{t('user-bar.mod_cp')}</span>
              </Link>
            </DrawerClose>
          )}

          {session.is_admin && (
            <DrawerClose asChild>
              <Button
                variant="ghost"
                onClick={() => window.open('/admin', '_blank')}
                className={classNameDrawerQuickMenu}
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
              variant="ghost"
              onClick={onSubmit}
              className={classNameDrawerQuickMenu}
            >
              <LogOut /> <span>{t('user-bar.log_out')}</span>
            </Button>
          </DrawerClose>
        </div>
      )}
    </DrawerContent>
  );
};
