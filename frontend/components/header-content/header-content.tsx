import type { ReactNode } from 'react';

import { cx } from '@/functions/classnames';

interface HeaderContentProps {
  children?: ReactNode;
  className?: string;
  desc?: ReactNode;
}

interface HeaderContentH1Props extends HeaderContentProps {
  h1: string | ReactNode;
  h2?: never;
}

interface HeaderContentH2Props extends HeaderContentProps {
  h2: string | ReactNode;
  h1?: never;
}

export const HeaderContent = ({
  children,
  className,
  desc,
  h1,
  h2
}: HeaderContentH1Props | HeaderContentH2Props) => {
  return (
    <div className={cx('mb-5 flex gap-4 flex-col sm:flex-row items-center', className)}>
      <div className="space-y-1 text-center sm:text-left">
        {h1 ? (
          <h1 className="font-semibold tracking-tight text-2xl">{h1}</h1>
        ) : (
          <h2 className="font-semibold tracking-tight text-xl">{h2}</h2>
        )}
        {desc && (
          <div className="text-sm text-muted-foreground [&_p]:text-center sm:[&_p]:text-left">
            {desc}
          </div>
        )}
      </div>

      {children && (
        <div className="ml-auto flex flex-col sm:flex-row gap-2 items-center justify-center flex-wrap w-full sm:w-auto [&>*]:w-full [&>*]:sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
