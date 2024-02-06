import type { ReactNode } from "react";

import { cx } from "@/functions/classnames";
import { Badge, type BadgeProps } from "@/components/ui/badge";

interface Props extends Pick<BadgeProps, "variant"> {
  children: ReactNode;
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
      className={cx(
        "px-3 py-1 [&>svg]:size-4 flex-shrink-0 text-sm",
        className
      )}
    >
      {children}
    </Badge>
  );
};
