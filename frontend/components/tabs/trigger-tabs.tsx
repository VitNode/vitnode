'use client';

import { Link, usePathname } from '@/i18n';
import { buttonVariants } from '../ui/button';

export interface TabsTriggerProps {
  id: string;
  text: string;
  active?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const TabsTrigger = ({
  active: activeFromProps,
  className,
  href,
  onClick,
  text
}: TabsTriggerProps) => {
  const pathname = usePathname();
  const active = activeFromProps || (href && pathname.includes(href));
  const dataState = active ? 'active' : 'inactive';

  if (href) {
    return (
      <Link
        href={href}
        data-state={dataState}
        className={buttonVariants({
          variant: active ? 'default' : 'ghost',
          className
        })}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-state={dataState}
      className={buttonVariants({
        variant: active ? 'default' : 'ghost',
        className
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
