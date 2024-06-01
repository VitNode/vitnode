"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

interface Props {
  children: React.ReactNode;
}

export const NavWrapper = ({ children }: Props) => {
  return (
    <NavigationMenu.Root className="relative sm:block hidden z-10 flex-1">
      {children}

      <div
        className="absolute left-0 top-full flex justify-center"
        style={{ perspective: "2000px" }}
      >
        <NavigationMenu.Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] transition-all" />
      </div>
    </NavigationMenu.Root>
  );
};
