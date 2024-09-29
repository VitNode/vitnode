'use client';

import { usePathname, useRouter } from '@/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ItemQuickMenu } from './item';

export const QuickMenuWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('core.global.mobile_nav');
  const pathname = usePathname();
  const { back } = useRouter();

  return (
    <>
      {pathname !== '/' && (
        <ItemQuickMenu onClick={back}>
          <ArrowLeft />
          <span>{t('back')}</span>
        </ItemQuickMenu>
      )}
      <ItemQuickMenu active={pathname.startsWith('/search')} href="/search">
        <Search />
        <span>{t('search')}</span>
      </ItemQuickMenu>
      {children}
    </>
  );
};
