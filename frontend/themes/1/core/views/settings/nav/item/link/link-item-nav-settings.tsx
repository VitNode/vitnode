"use client";

import { motion } from "framer-motion";

import { Link, usePathname } from "@/utils/i18n";
import { cn } from "@/functions/classnames";
import { buttonVariants } from "@/components/ui/button";
import { LinkItemNavSettingsProps } from "@/hooks/core/settings/use-settings-view";

export const LinkItemNavSettings = ({
  children,
  href,
  onClick
}: LinkItemNavSettingsProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start gap-2 relative pl-4",
        { "bg-primary/10": active }
      )}
      onClick={onClick}
    >
      {children}

      {active && (
        <motion.div
          className="absolute left-1 w-1 h-[calc(100%_-_1rem)] bg-primary rounded-md"
          layoutId="settings_user_nav_underline"
        />
      )}
    </Link>
  );
};
