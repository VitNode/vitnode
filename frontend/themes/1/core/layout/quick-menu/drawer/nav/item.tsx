import * as React from "react";
import { Link, usePathname } from "@vitnode/frontend/navigation";

import { buttonVariants } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/functions/classnames";
import { ShowCoreNav } from "@/utils/graphql/hooks";
import { classNameDrawerQuickMenu } from "../drawer";

interface Props extends Omit<ShowCoreNav, "__typename" | "children"> {
  children: React.ReactNode;
}

export const ItemNavDrawerQuickMenu = ({
  external,
  href,
  id,

  children
}: Props) => {
  const pathname = usePathname();
  const active =
    href === pathname || (pathname.startsWith(href) && href !== "/");

  return (
    <DrawerClose key={id} asChild>
      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: cn(
              classNameDrawerQuickMenu,
              "h-auto flex-col items-start gap-1",
              {
                "bg-accent": active
              }
            )
          })
        )}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </DrawerClose>
  );
};
