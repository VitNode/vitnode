import { ReactNode } from 'react';

import { NavAdmin } from './nav/nav-admin';
import { HeaderAdmin } from './header/header-admin';

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <NavAdmin />
      <HeaderAdmin />
      <main className="ml-60">{children}</main>
    </>
  );
};
