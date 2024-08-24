import { buttonVariants } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { ShowCoreNav } from '@/graphql/types';
import { cn } from '@/helpers/classnames';
import { Link, usePathname } from '@/navigation';
import React from 'react';

import { classNameDrawerQuickMenu } from '../drawer';

interface Props extends Omit<ShowCoreNav, '__typename' | 'children'> {
  children: React.ReactNode;
}

export const ItemNavDrawerQuickMenu = ({
  external,
  href,
  id,

  children,
}: Props) => {
  const pathname = usePathname();
  const active =
    href === pathname || (pathname.startsWith(href) && href !== '/');

  return (
    <DrawerClose asChild key={id}>
      <Link
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: cn(
              classNameDrawerQuickMenu,
              'h-auto flex-col items-start gap-1',
              {
                'bg-accent': active,
              },
            ),
          }),
        )}
        href={href}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        {children}
      </Link>
    </DrawerClose>
  );
};
