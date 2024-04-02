"use client";

import { useSession } from "@/hooks/core/use-session";
import { ItemNav } from "./item";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";

export const Nav = () => {
  const { nav } = useSession();

  return (
    <NavigationMenu className="relative sm:block hidden z-10 flex-1">
      <div className="flex-1 overflow-x-auto h-full p-1 flex">
        <NavigationMenuList className="flex-1 flex list-none gap-2">
          {nav.map((data, i) => (
            <ItemNav key={i} {...data} />
          ))}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};
