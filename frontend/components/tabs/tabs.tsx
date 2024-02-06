import type { ReactNode } from "react";

import { cx } from "@/functions/classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div className={cx("flex", className)}>
      <div className="flex rounded-md bg-muted p-1 text-muted-foreground overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
