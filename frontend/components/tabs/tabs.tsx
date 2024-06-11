import * as React from "react";
import { cn } from "@vitnode/frontend/helpers";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div className={cn("flex", className)}>
      <div className="bg-accent/50 text-muted-foreground flex items-center justify-center overflow-x-auto rounded-lg p-1">
        {children}
      </div>
    </div>
  );
};
