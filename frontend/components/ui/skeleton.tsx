import type { HTMLAttributes } from "react";

import { cn } from "@/functions/classnames";

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary", className)}
      {...props}
    />
  );
}

export { Skeleton };
