'use client';

import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export const NavWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu.Root className="relative z-10 hidden flex-1 sm:block">
      {children}

      <div
        className="absolute left-0 top-full flex justify-center"
        style={{ perspective: '2000px' }}
      >
        <NavigationMenu.Viewport className="origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow transition-all md:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};
