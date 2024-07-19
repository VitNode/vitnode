'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ItemQuickMenu } from '../item';
import { DrawerQuickMenu } from './drawer';
import { useSession } from '@/hooks/use-session';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { AvatarUser } from '@/components/ui/user/avatar';

export const ButtonDrawer = ({
  navIcons,
}: {
  navIcons: { icon: React.ReactNode; id: number }[];
}) => {
  const t = useTranslations('core.mobile_nav');
  const { session } = useSession();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ItemQuickMenu>
          {session ? <AvatarUser user={session} sizeInRem={1.5} /> : <Menu />}
          <span>{t('menu')}</span>
        </ItemQuickMenu>
      </DrawerTrigger>

      <DrawerQuickMenu navIcons={navIcons} />
    </Drawer>
  );
};
