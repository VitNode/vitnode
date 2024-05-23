import type { ReactNode, RefCallback } from "react";

import { cn } from "@/functions/classnames";

interface HeaderContentProps {
  children?: ReactNode;
  className?: string;
  desc?: ReactNode;
  ref?: RefCallback<HTMLDivElement>;
}

interface HeaderContentH1Props extends HeaderContentProps {
  h1: ReactNode | string;
  h2?: never;
}

interface HeaderContentH2Props extends HeaderContentProps {
  h2: ReactNode | string;
  h1?: never;
}

export const HeaderContent = ({
  children,
  className,
  desc,
  h1,
  h2,
  ref
}: HeaderContentH1Props | HeaderContentH2Props) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex sm:gap-4 gap-2 flex-col sm:flex-row items-start mb-4 min-h-9",
        className
      )}
    >
      <div className="space-y-1 text-left flex-1 sm:self-center h-full">
        {h1 ? (
          <h1 className="font-bold tracking-tight text-2xl">{h1}</h1>
        ) : (
          <h2 className="font-bold tracking-tight text-xl">{h2}</h2>
        )}
        {desc && (
          <div className="text-sm text-muted-foreground [&_p]:text-left">
            {desc}
          </div>
        )}
      </div>

      {children && (
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center flex-wrap w-full sm:w-auto [&>*]:w-full [&>*]:sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
