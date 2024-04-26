"use client";

import { usePathname } from "@/utils/i18n";
import { cn } from "@/functions/classnames";
import { buttonVariants } from "@/components/ui/button";
import { type LinkItemNavSettingsProps } from "@/hooks/core/settings/use-settings-view";
import { Link } from "@/utils/i18n/link";

export const LinkItemNavSettings = ({
  children,
  href,
  onClick
}: LinkItemNavSettingsProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: href === pathname ? "default" : "ghost" }),
        "justify-start gap-2"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
