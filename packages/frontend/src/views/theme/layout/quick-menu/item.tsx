import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';
import React from 'react';

export const ItemQuickMenu = ({
  active,
  children,
  href,
  onClick,
  ref,
}: {
  active?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ref?: React.Ref<HTMLAnchorElement> | React.RefObject<HTMLButtonElement>;
}) => {
  const className = cn(
    'text-foreground [&>span]:text-muted-foreground flex flex-1 flex-col items-center justify-center gap-1.5 px-1 pb-2 pt-1.5 text-center text-xs leading-none no-underline [&>svg]:size-6',
    {
      'text-primary': active,
    },
  );

  if (href) {
    return (
      <Link
        className={className}
        href={href}
        onClick={onClick}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
    >
      {children}
    </button>
  );
};
