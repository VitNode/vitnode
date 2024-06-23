"use client";

import * as React from "react";
import { Link, usePathname } from "vitnode-frontend/navigation";
import { cn } from "vitnode-frontend/helpers";
import { motion } from "framer-motion";
import { buttonVariants } from "vitnode-frontend/components";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative pb-2">{children}</div>;
};

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
  className: classNameFromProps,
  href,
  onClick,
}: TabsTriggerProps) => {
  const pathname = usePathname();
  const active = activeFromProps || (href && pathname.includes(href));
  const dataState = active ? "active" : "inactive";

  const activeBar = active ? (
    <motion.span
      className="bg-primary absolute bottom-0 left-0 h-[2px] w-full rounded-sm"
      layoutId="tabs-trigger-active"
      transition={{
        duration: 0.18,
        ease: "easeInOut",
      }}
      style={{ originY: "0px" }}
    />
  ) : null;

  const className = buttonVariants({
    variant: "ghost",
    className: cn(
      classNameFromProps,
      "text-muted-foreground hover:text-foreground flex-shrink-0",
      {
        "text-foreground": active,
      },
    ),
    size: "sm",
  });

  if (href) {
    return (
      <Wrapper>
        <Link
          href={href}
          data-state={dataState}
          className={className}
          onClick={onClick}
        >
          {activeBar}
          {children}
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <button
        type="button"
        data-state={dataState}
        className={className}
        onClick={onClick}
      >
        {activeBar}
        {children}
      </button>
    </Wrapper>
  );
};
