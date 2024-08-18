'use client';

import { Link, usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';

import { LinkItemNavSettingsProps } from '../../hooks/use-settings-view';

export const LinkItemNavSettings = ({
  children,
  href,
  onClick,
}: LinkItemNavSettingsProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'default' : 'ghost'}
      size="sm"
      className="relative justify-start gap-2"
      asChild
    >
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    </Button>
  );
};
