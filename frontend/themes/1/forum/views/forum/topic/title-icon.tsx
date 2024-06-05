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
        "flex-shrink-0 px-3 py-1 text-sm [&>svg]:size-4",
        className
      )}
    >
      {children}
    </Badge>
  );
};
