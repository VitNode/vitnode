"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { useSession } from "@/plugins/core/hooks/use-session";
import { ItemNav } from "./item";

export const Nav = () => {
  const { nav } = useSession();

  return (
    <NavigationMenu.Root className="relative sm:block hidden z-10 flex-1">
      <div className="flex-1 overflow-x-auto h-full p-1 flex">
        <NavigationMenu.List className="flex list-none gap-2">
          {nav.map((data, i) => (
            <ItemNav key={i} {...data} />
          ))}
        </NavigationMenu.List>
      </div>

      {/* <div
        className="absolute left-0 top-full flex justify-center"
        style={{ perspective: "2000px" }}
      >
        <NavigationMenu.Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] transition-all" />
      </div> */}
    </NavigationMenu.Root>
  );
};
