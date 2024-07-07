import * as React from 'react';

import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';

interface Props {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  ref?: React.Ref<HTMLAnchorElement> | React.RefObject<HTMLButtonElement>;
}

export const ItemQuickMenu = ({
  active,
  children,
  href,
  onClick,
  ref,
}: Props) => {
  const className = cn(
    'text-foreground [&>span]:text-muted-foreground flex flex-1 flex-col items-center justify-center gap-1.5 px-1 pb-2 pt-1.5 text-center text-xs leading-none no-underline [&>svg]:size-6',
    {
      'text-primary': active,
    },
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        onClick={onClick}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
};
