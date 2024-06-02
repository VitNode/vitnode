"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as React from "react";

import { AdminNavContext } from "./hooks/use-admin-nav";

interface Props {
  children: React.ReactNode;
}

export const NavAdminWrapper = ({ children }: Props) => {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  return (
    <AdminNavContext.Provider value={{ setActiveItems }}>
      <Accordion.Root type="multiple" defaultValue={activeItems}>
        {children}
      </Accordion.Root>
    </AdminNavContext.Provider>
  );
};
