"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { useSession } from "@/hooks/core/use-session";
import { ItemNav } from "./item";

export const Nav = () => {
  const { nav } = useSession();

  return (
    <NavigationMenu.Root className="relative sm:block hidden z-10 flex-1">
      <div className="flex-1 overflow-x-auto h-full p-1 flex justify-center">
        <NavigationMenu.List className="flex-1 flex list-none gap-2">
          {nav.map((data, i) => (
            <ItemNav key={i} {...data} />
          ))}
        </NavigationMenu.List>
      </div>

      <div
        className="absolute flex justify-center w-full top-full left-0"
        style={{ perspective: "2000px" }}
      >
        <NavigationMenu.Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NavigationMenu.Root>
  );
};
