import 'server-only';

import { LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';

import { cn } from '@/helpers/classnames';

export type IconLucideNames = keyof typeof dynamicIconImports;

interface Props extends Omit<LucideIcon, '$$typeof'> {
  name: IconLucideNames | string;
  className?: string;
}

export const Icon = ({ className, name, ...props }: Props) => {
  if (/\p{Extended_Pictographic}/gu.test(name)) {
    return <span className={cn('text-center', className)}>{name}</span>;
  }

  const LucideIcon = dynamic(dynamicIconImports[name]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <LucideIcon className={cn('text-center', className)} {...props} />;
};
