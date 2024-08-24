'use client';

import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/navigation';

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
      asChild
      className="relative justify-start gap-2"
      size="sm"
      variant={active ? 'default' : 'ghost'}
    >
      <Link href={href} onClick={onClick}>
        {children}
      </Link>
    </Button>
  );
};
