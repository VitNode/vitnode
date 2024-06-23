"use client";

import { ChevronDown } from "lucide-react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as React from "react";
import { Link, usePathname } from "vitnode-frontend/navigation";
import { cn } from "vitnode-frontend/helpers";

import { buttonVariants } from "@/components/ui/button";
import { ShowCoreNav } from "@/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";

interface Props extends Omit<ShowCoreNav, "icon"> {
  icons: { icon: React.ReactNode; id: number }[];
}

export const ItemNav = ({
  children,
  external,
  href,
  name,
  icons,
  id,
}: Props) => {
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const active =
    href === pathname || (pathname.startsWith(href) && href !== "/");

  return (
    <NavigationMenu.Item className="shrink-0">
      <NavigationMenu.Trigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: active ? "outline" : "ghost",
              className: cn("px-6", {
                "bg-card dark:bg-accent": active,
              }),
            }),
          )}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {icons.find(icon => icon.id === id)?.icon}
          {convertText(name)} {children.length > 0 && <ChevronDown />}
        </Link>
      </NavigationMenu.Trigger>

      {children.length > 0 && (
        <NavigationMenu.Content
          className={cn(
            "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-56 duration-200 ease-in-out",
            {
              "w-[30rem]": children.length >= 3,
              "lg:w-[50rem]": children.length >= 5,
            },
          )}
        >
          <ul className="flex flex-wrap gap-1 p-2">
            {children.map(item => {
              const activeItem =
                item.href === pathname ||
                (pathname.startsWith(item.href) && item.href !== "/");

              const icon = icons.find(
                childIcon => childIcon.id === item.id,
              )?.icon;

              return (
                <li
                  key={item.id}
                  className={cn("flex-1 basis-full", {
                    "basis-[calc(50%-0.5rem)]": children.length >= 3,
                    "lg:basis-[calc(33%-0.5rem)]": children.length >= 5,
                  })}
                >
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-accent-foreground flex h-full select-none flex-col justify-center gap-1 rounded-md px-3 py-2 leading-none no-underline outline-none transition-colors",
                        {
                          "bg-accent": activeItem,
                        },
                      )}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <div className="flex gap-1 font-medium">
                        {icon}
                        {convertText(item.name)}
                      </div>
                      {item.description && (
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                          {convertText(item.description)}
                        </p>
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </li>
              );
            })}
          </ul>
        </NavigationMenu.Content>
      )}
    </NavigationMenu.Item>
  );
};
