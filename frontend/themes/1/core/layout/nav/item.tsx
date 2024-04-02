import { ChevronDown } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { buttonVariants } from "@/components/ui/button";
import type { ShowCoreNav } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { Link, usePathname } from "@/i18n";
import { cn } from "@/functions/classnames";
import { Icon } from "@/components/icon/icon";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

export const ItemNav = ({
  children,
  external,
  href,
  icon,
  name
}: ShowCoreNav) => {
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const active =
    href === pathname || (pathname.startsWith(href) && href !== "/");

  return (
    <NavigationMenuItem className="flex-shrink-0">
      <NavigationMenu.Trigger asChild>
        <Link
          href={href}
          className={buttonVariants({
            variant: "ghost",
            className: cn("px-6", {
              "bg-accent": active
            })
          })}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {icon && <Icon className="text-lg" name={icon} />} {convertText(name)}{" "}
          {children.length > 0 && <ChevronDown />}
        </Link>
      </NavigationMenu.Trigger>

      {children.length > 0 && (
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {children.map(item => {
              const activeItem =
                item.href === pathname ||
                (pathname.startsWith(item.href) && item.href !== "/");

              return (
                <li key={item.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex flex-col justify-center select-none gap-1 rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-full text-accent-foreground",
                        {
                          "bg-accent": activeItem
                        }
                      )}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <div className="font-medium flex gap-1">
                        {item.icon && (
                          <Icon className="size-4" name={item.icon} />
                        )}
                        {convertText(item.name)}
                      </div>
                      {item.description && (
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {convertText(item.description)}
                        </p>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
};
