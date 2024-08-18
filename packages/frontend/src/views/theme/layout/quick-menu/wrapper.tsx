'use client';

import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ItemQuickMenu } from './item';
import { usePathname, useRouter } from '@/navigation';

export const QuickMenuWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('core.mobile_nav');
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
      <ItemQuickMenu href="/search" active={pathname.startsWith('/search')}>
        <Search />
        <span>{t('search')}</span>
      </ItemQuickMenu>
      {children}
    </>
  );
};
