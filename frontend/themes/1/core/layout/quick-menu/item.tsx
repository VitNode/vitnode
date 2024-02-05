import cx from 'clsx';
import type { ReactNode } from 'react';

import { Link } from '@/i18n';

interface Props {
  children: ReactNode;
  active?: boolean;
  href?: string;
}

export const ItemQuickMenu = ({ active, children, href }: Props) => {
  const className = cx(
    'flex-1 text-center flex items-center justify-center flex-col gap-1.5 pt-1.5 pb-2 px-1 text-foreground no-underline text-xs [&>svg]:size-6 [&>span]:text-muted-foreground leading-none',
    {
      'text-primary': active
    }
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};
