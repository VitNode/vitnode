import type { ReactNode } from "react";

import { cn } from "@/functions/classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div className={cn("flex", className)}>
      <div className="flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
