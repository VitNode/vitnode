"use client";

import * as React from "react";
import { Link, usePathname } from "@vitnode/frontend/navigation";
import { cn } from "@vitnode/frontend/helpers";

import { buttonVariants } from "../ui/button";

export interface TabsTriggerProps {
  children: React.ReactNode;
  id: string;
  active?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const TabsTrigger = ({
  active: activeFromProps,
  children,
  className,
  href,
  onClick
}: TabsTriggerProps) => {
  const pathname = usePathname();
  const active = activeFromProps || (href && pathname.includes(href));
  const dataState = active ? "active" : "inactive";

  if (href) {
    return (
      <Link
        href={href}
        data-state={dataState}
        className={buttonVariants({
          variant: active ? "default" : "ghost",
          className: cn(className, "flex-shrink-0"),
          size: "sm"
        })}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-state={dataState}
      className={buttonVariants({
        variant: active ? "default" : "ghost",
        className: cn(className, "flex-shrink-0"),
        size: "sm"
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
