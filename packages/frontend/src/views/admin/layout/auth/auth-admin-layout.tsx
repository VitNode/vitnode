import React from 'react';

import { AsideAuthAdmin } from './aside/aside';
import { HeaderAdmin } from './header/header';

export interface AuthAdminLayoutProps {
  children: React.ReactNode;
}

export const AuthAdminLayout = ({ children }: AuthAdminLayoutProps) => {
  return (
    <>
      <AsideAuthAdmin />
      <HeaderAdmin />

      <main className="text-card-foreground mt-16 px-2 py-6 md:my-0 md:ml-[240px] md:mt-0 md:px-6 lg:px-10 xl:ml-[260px]">
        <div className="container">{children}</div>
      </main>
    </>
  );
};
