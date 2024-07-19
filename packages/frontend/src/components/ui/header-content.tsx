import React from 'react';

import { cn } from '../../helpers/classnames';

interface HeaderContentProps {
  children?: React.ReactNode;
  className?: string;
  desc?: React.ReactNode;
  ref?: React.RefCallback<HTMLDivElement>;
}

interface HeaderContentH1Props extends HeaderContentProps {
  h1: React.ReactNode | string;
  h2?: never;
}

interface HeaderContentH2Props extends HeaderContentProps {
  h2: React.ReactNode | string;
  h1?: never;
}

export const HeaderContent = ({
  children,
  className,
  desc,
  h1,
  h2,
  ref,
}: HeaderContentH1Props | HeaderContentH2Props) => {
  return (
    <div
      ref={ref}
      className={cn(
        'mb-4 flex min-h-9 flex-col items-start gap-2 sm:flex-row sm:gap-4',
        className,
      )}
    >
      <div className="h-full flex-1 space-y-1 text-left sm:self-center">
        {h1 ? (
          <h1 className="text-2xl font-bold tracking-tight">{h1}</h1>
        ) : (
          <h2 className="text-xl font-bold tracking-tight">{h2}</h2>
        )}
        {desc && (
          <div className="text-muted-foreground text-sm [&_p]:text-left">
            {desc}
          </div>
        )}
      </div>

      {children && (
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-2 sm:w-auto sm:flex-row [&>*]:w-full [&>*]:sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
