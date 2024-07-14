'use client';

import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export const NavListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu.List className="flex list-none gap-2">
      {children}
    </NavigationMenu.List>
  );
};
