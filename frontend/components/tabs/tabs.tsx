import * as React from "react";

import { cn } from "@/functions/classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div className={cn("flex", className)}>
      <div className="flex items-center justify-center rounded-lg bg-accent/50 p-1 text-muted-foreground overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
