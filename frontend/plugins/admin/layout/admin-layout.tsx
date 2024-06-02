import * as React from "react";

import { NavAdmin } from "./nav/nav-admin";
import { HeaderAdmin } from "./header/header-admin";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderAdmin />
      <nav className="fixed top-16 left-0 h-[calc(100vh_-_4rem)] w-64 overflow-y-auto z-10 hidden md:block overflow-auto px-4 py-2 space-y-5">
        <NavAdmin />
      </nav>
      <main className="md:ml-64 mt-16 p-5 sm:pl-2 text-card-foreground">
        <div className="container">{children}</div>
      </main>
    </>
  );
};
