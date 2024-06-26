import 'server-only';

import * as Lucide from 'lucide-react';
import * as React from 'react';

export type IconLucideNames = keyof typeof Lucide.icons;

interface Props extends Omit<Lucide.LucideIcon, '$$typeof'> {
  name: IconLucideNames | string;
  className?: string;
}

export const Icon = React.memo(({ className, name, ...props }: Props) => {
  if (/\p{Extended_Pictographic}/gu.test(name)) {
    return <span className={className}>{name}</span>;
  }

  const LucideIcon = React.lazy<React.ComponentType<Lucide.LucideProps>>(
    async () =>
      import('lucide-react')
        .then(mod => mod[name as IconLucideNames])
        .then(mod => ({ default: mod })),
  );

  return <LucideIcon className={className} {...props} />;
});

Icon.displayName = 'Icon';
