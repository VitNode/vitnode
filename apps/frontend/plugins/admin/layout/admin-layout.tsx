import * as React from 'react';

import { NavAdmin } from './nav/nav-admin';
import { HeaderAdmin } from './header/header-admin';

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderAdmin />
      <nav className="fixed left-0 top-16 z-10 hidden h-[calc(100vh_-_4rem)] w-64 space-y-5 overflow-auto px-4 py-2 md:block">
        <NavAdmin />
      </nav>
      <main className="text-card-foreground mt-16 p-5 sm:pl-2 md:ml-64">
        <div className="container">{children}</div>
      </main>
    </>
  );
};
