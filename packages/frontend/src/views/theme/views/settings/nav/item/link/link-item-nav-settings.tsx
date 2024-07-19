'use client';

import { motion } from 'framer-motion';

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
        'relative justify-start gap-2 pl-4',
        { 'bg-primary/10': active },
      )}
      onClick={onClick}
    >
      {children}

      {active && (
        <motion.div
          className="bg-primary absolute left-1 h-[calc(100%_-_1rem)] w-1 rounded-md"
          layoutId="settings_user_nav_underline"
        />
      )}
    </Link>
  );
};
