import { ReactNode } from 'react';
import { NavAdmin } from './nav/nav-admin';

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <NavAdmin />
      <main className="ml-16">{children}</main>
    </>
  );
};
