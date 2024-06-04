"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { Link, usePathname } from "@/utils/i18n";

export interface ItemItemNavAdminProps {
  href: string;
  id: string;
  children?: Omit<ItemItemNavAdminProps, "icon">[];
  icon?: string;
}

interface Props extends ItemItemNavAdminProps {
  icons: { icon: React.ReactNode; id: string }[];
  primaryId: string;
}

export const LinkItemNavAdmin = ({
  icons,
  href: hrefFromProps,
  primaryId,
  id,
  icon,
  children
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${primaryId}.admin.nav`);
  const pathname = usePathname();
  const href = `/admin/${primaryId}/${hrefFromProps}`;
  const active = pathname.startsWith(`/admin/${primaryId}/${id}`);
  const isChildActive =
    children?.some(child =>
      pathname.startsWith(`/admin/${primaryId}/${child.href}`)
    ) ?? false;

  const buttonClass = (active: boolean) =>
    cn(
      "w-full justify-start relative hover:bg-primary/10 text-foreground [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:flex [&>svg]:items-center [&>svg]:justify-center [&>svg]:text-muted-foreground h-8 font-normal [&[data-state=open]>svg:not(:first-child)]:rotate-180",
      {
        "bg-primary/10 ": active
      }
    );

  const primaryButtonClass = (active: boolean) =>
    cn(buttonClass(active), "pl-4");

  return (
    <Accordion.Item value={`${primaryId}_${id}`}>
      {children && children.length > 0 ? (
        <Accordion.Trigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={primaryButtonClass(active && !isChildActive)}
          >
            {icon ? icons.find(i => i.id === id)?.icon : "null"}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <span>{t(id)}</span>
            <ChevronDown className="ml-auto transition-transform" />
            {active && (
              <motion.div
                className="absolute left-1 w-1 h-[calc(100%_-_1rem)] bg-primary rounded-md"
                layoutId="admin_nav_underline"
              />
            )}
          </Button>
        </Accordion.Trigger>
      ) : (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            primaryButtonClass(active)
          )}
        >
          {icon ? icons.find(i => i.id === id)?.icon : "null"}
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
      )}

      {children && children.length > 0 && (
        <Accordion.Content className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden my-1">
          <div className="space-y-1 ml-7">
            {children.map(child => {
              const href = `/admin/${primaryId}/${id}/${child.href}`;
              const active = pathname.startsWith(href);

              return (
                <Link
                  key={`${primaryId}_${child.id}`}
                  href={href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    buttonClass(active)
                  )}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <span>{t(`${id}_${child.id}`)}</span>
                </Link>
              );
            })}
          </div>
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};
