import * as React from "react";
import { cn } from "@vitnode/frontend/helpers";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "no-scrollbar shadow-border overflow-x-auto shadow-[inset_0_-2px_0]",
        className,
      )}
    >
      <div className="flex">{children}</div>
    </div>
  );
};
