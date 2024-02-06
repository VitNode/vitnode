import type { ReactNode } from "react";

import { NavAdmin } from "./nav/nav-admin";
import { HeaderAdmin } from "./header/header-admin";

interface Props {
  children: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <NavAdmin />
      <HeaderAdmin />
      <main className="sm:ml-60 mt-16 p-5 rounded-l-lg border bg-card text-card-foreground shadow-sm">
        {children}
      </main>
    </>
  );
};
