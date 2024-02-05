'use client';

import { Bell, Home, Mail, Menu, Search, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ItemQuickMenu } from './item';
import { usePathname } from '@/i18n';
import { useSession } from '@/hooks/core/use-session';

export const QuickMenu = () => {
  const t = useTranslations('core.mobile_nav');
  const pathname = usePathname();
  const { session } = useSession();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed bottom-0 z-50 w-full border-t bg-card/75 backdrop-blur sm:hidden flex">
      <ItemQuickMenu active={pathname === '/'} href="/">
        <Home />
        <span>{t('home')}</span>
      </ItemQuickMenu>

      <ItemQuickMenu href="/search" active={pathname.startsWith('/search')}>
        <Search />
        <span>{t('search')}</span>
      </ItemQuickMenu>

      {session ? (
        <>
          <ItemQuickMenu>
            <Bell />
            <span>{t('notifications')}</span>
          </ItemQuickMenu>

          <ItemQuickMenu>
            <Mail />
            <span>{t('messages')}</span>
          </ItemQuickMenu>
        </>
      ) : (
        <ItemQuickMenu href="/login" active={pathname.startsWith('/login')}>
          <UserRound />
          <span>{t('login')}</span>
        </ItemQuickMenu>
      )}

      <ItemQuickMenu>
        <Menu />
        <span>{t('menu')}</span>
      </ItemQuickMenu>
    </div>
  );
};
