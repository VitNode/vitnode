import * as React from "react";

import { cn } from "@/functions/classnames";
import { Badge, BadgeProps } from "@/components/ui/badge";

interface Props extends Pick<BadgeProps, "variant"> {
  children: React.ReactNode;
  className?: string;
}

export const TitleIconTopic = ({
  children,
  className,
  variant = "default"
}: Props) => {
  return (
    <Badge
      variant={variant}
      className={cn(
        "px-3 py-1 [&>svg]:size-4 flex-shrink-0 text-sm",
        className
      )}
    >
      {children}
    </Badge>
  );
};
