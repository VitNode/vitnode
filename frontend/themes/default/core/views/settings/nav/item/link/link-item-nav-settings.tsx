'use client';

import { Link, usePathname } from '@/i18n';
import { cx } from '@/functions/classnames';
import { buttonVariants } from '@/components/ui/button';
import { LinkItemNavSettingsProps } from '@/hooks/core/settings/use-settings-view';

export const LinkItemNavSettings = ({ children, href, onClick }: LinkItemNavSettingsProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cx(
        buttonVariants({ variant: href === pathname ? 'default' : 'ghost' }),
        'justify-start gap-2'
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
