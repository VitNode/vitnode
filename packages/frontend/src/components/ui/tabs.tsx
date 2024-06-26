'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import { buttonVariants } from './button';

import { Link, usePathname } from '../../navigation';
import { cn } from '../../helpers/classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Tabs = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'no-scrollbar shadow-border overflow-x-auto shadow-[inset_0_-2px_0]',
        className,
      )}
    >
      <div className="flex">{children}</div>
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative pb-2">{children}</div>;
};

export interface TabsTriggerProps {
  children: React.ReactNode;
  id: string;
  active?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const TabsTrigger = ({
  active: activeFromProps,
  children,
  className: classNameFromProps,
  href,
  onClick,
}: TabsTriggerProps) => {
  const pathname = usePathname();
  const active = activeFromProps || (href && pathname.includes(href));
  const dataState = active ? 'active' : 'inactive';

  const activeBar = active ? (
    <motion.span
      className="bg-primary absolute bottom-0 left-0 h-[2px] w-full rounded-sm"
      layoutId="tabs-trigger-active"
      transition={{
        duration: 0.18,
        ease: 'easeInOut',
      }}
      style={{ originY: '0px' }}
    />
  ) : null;

  const className = buttonVariants({
    variant: 'ghost',
    className: cn(
      classNameFromProps,
      'text-muted-foreground hover:text-foreground flex-shrink-0',
      {
        'text-foreground': active,
      },
    ),
    size: 'sm',
  });

  if (href) {
    return (
      <Wrapper>
        <Link
          href={href}
          data-state={dataState}
          className={className}
          onClick={onClick}
        >
          {activeBar}
          {children}
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <button
        type="button"
        data-state={dataState}
        className={className}
        onClick={onClick}
      >
        {activeBar}
        {children}
      </button>
    </Wrapper>
  );
};
