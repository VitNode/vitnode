'use client';

import React from 'react';

import { NavContext } from './hooks/use-nav';

export const NavWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openChild, setOpenChild] = React.useState<number | null>(null);

  return (
    <NavContext.Provider value={{ openChild, setOpenChild }}>
      {children}
    </NavContext.Provider>
  );
};
