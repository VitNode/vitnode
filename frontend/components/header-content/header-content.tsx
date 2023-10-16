import { ReactNode } from 'react';

interface HeaderContentProps {
  children?: ReactNode;
  desc?: string;
}

interface HeaderContentH1Props extends HeaderContentProps {
  h1: string;
  h2?: never;
}

interface HeaderContentH2Props extends HeaderContentProps {
  h2: string;
  h1?: never;
}

export const HeaderContent = ({
  children,
  desc,
  h1,
  h2
}: HeaderContentH1Props | HeaderContentH2Props) => {
  return (
    <div className="mb-5 flex gap-4 flex-col sm:flex-row">
      <div>
        {h1 ? (
          <h1 className="text-2xl font-bold tracking-tight">{h1}</h1>
        ) : (
          <h2 className="text-xl font-bold tracking-tight">{h2}</h2>
        )}
        {desc && <p className="text-muted-foreground">{desc}</p>}
      </div>

      {children && (
        <div className="ml-auto flex flex-col sm:flex-row gap-2 items-center justify-center flex-wrap w-full sm:w-auto [&>*]:w-full [&>*]:sm:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};
