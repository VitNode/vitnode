"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { Link, usePathname } from "@/utils/i18n";

export interface ItemItemNavAdminProps {
  href: string;
  id: string;
  icon?: string;
}

interface Props extends Omit<ItemItemNavAdminProps, "icon"> {
  children: React.ReactNode;
  primaryId: string;
}

export const LinkItemNavAdmin = ({ children, href, primaryId, id }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${primaryId}.admin.nav`);
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "w-full justify-start relative pl-4 hover:bg-primary/10 text-foreground [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:flex [&>svg]:items-center [&>svg]:justify-center [&>svg]:text-muted-foreground h-8",
        {
          "bg-primary/10 ": active
        }
      )}
    >
      {children}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <span>{t(id)}</span>
      {active && (
        <motion.div
          className="absolute left-1 w-1 h-[calc(100%_-_1rem)] bg-primary rounded-md"
          layoutId="admin_nav_underline"
        />
      )}
    </Link>
  );
};
