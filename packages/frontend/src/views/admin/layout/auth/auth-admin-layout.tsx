import React from 'react';

import { HeaderAdmin } from './header/header-admin';
import { AsideAuthAdmin } from './aside/aside';

export interface AuthAdminLayoutProps {
  children: React.ReactNode;
}

export const AuthAdminLayout = ({ children }: AuthAdminLayoutProps) => {
  return (
    <>
      <AsideAuthAdmin />
      {/* <HeaderAdmin /> */}

      <main className="text-card-foreground px-10 py-5 md:ml-[240px] xl:ml-[260px]">
        <div className="container">{children}</div>
      </main>
    </>
  );
};
