'use client';

import { Link, usePathname } from '@/navigation';
import { cn } from '@/helpers/classnames';
import { buttonVariants } from '@/components/ui/button';

import { LinkItemNavSettingsProps } from '../../hooks/use-settings-view';

export const LinkItemNavSettings = ({
  children,
  href,
  onClick,
}: LinkItemNavSettingsProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'sm',
        }),
        'relative justify-start gap-2',
        { 'bg-primary/10': active },
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
