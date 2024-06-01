"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

interface Props {
  children: React.ReactNode;
}

export const NavListWrapper = ({ children }: Props) => {
  return (
    <NavigationMenu.List className="flex list-none gap-2">
      {children}
    </NavigationMenu.List>
  );
};
