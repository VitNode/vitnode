import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { getSessionData } from '@/graphql/get-session-data';
import { cn } from '@/helpers/classnames';
import React from 'react';

import { Nav } from '../nav/nav';
import { LogoHeader } from './logo';
import { AuthUserBar } from './user-bar/auth';
import { UserBar } from './user-bar/user-bar';

export const Header = async ({ className }: { className?: string }) => {
  const {
    core_sessions__authorization: { user },
    core_nav__show: { edges },
  } = await getSessionData();

  return (
    <header
      className={cn(
        'bg-background/75 sticky top-0 z-20 w-full border-b backdrop-blur transition-colors',
        className,
      )}
    >
      <div className="container flex h-16 items-center gap-5 px-5">
        <LogoHeader />
        {edges.length > 0 && <Nav />}

        <div className="ml-auto hidden gap-2 sm:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        {user ? <AuthUserBar /> : <UserBar />}
      </div>
    </header>
  );
};
