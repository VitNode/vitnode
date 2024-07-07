import * as React from 'react';

import { classNameDrawerQuickMenu } from '../drawer';

import { ShowCoreNav } from '@/graphql/graphql';
import { Link, usePathname } from '@/navigation';
import { DrawerClose } from '@/components/ui/drawer';
import { cn } from '@/helpers/classnames';
import { buttonVariants } from '@/components/ui/button';

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
    <DrawerClose key={id} asChild>
      <Link
        href={href}
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
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    </DrawerClose>
  );
};
