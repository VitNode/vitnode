import { Button, buttonVariants } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';
import React from 'react';

export const ItemDrawerHeaderAdmin = ({
  children,
  href,
  onClick,
  target,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}) => {
  const content = () => {
    const className =
      'hover:text-foreground/90 text-muted-foreground relative h-8 w-full justify-start font-normal [&>svg]:flex [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:items-center [&>svg]:justify-center [&[data-state=open]>svg:not(:first-child)]:rotate-180';

    if (href) {
      return (
        <Link
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className,
            }),
          )}
          href={href}
          onClick={onClick}
          target={target}
        >
          {children}
        </Link>
      );
    }

    return (
      <Button className={className} onClick={onClick} size="sm" variant="ghost">
        {children}
      </Button>
    );
  };

  return <SheetClose asChild>{content()}</SheetClose>;
};
