import { ChevronRight, Home } from 'lucide-react';
import * as React from 'react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from './button';

import { cn } from '../../helpers/classnames';
import { Link } from '../../navigation';

interface Props {
  items: { href: string; id: number | string; text: string }[];
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const Breadcrumbs = ({ children, items, ref }: Props) => {
  const t = useTranslations('core');
  const classNameItem = cn(
    buttonVariants({
      variant: 'link',
      size: 'sm',
      className: 'text-muted-foreground h-5 px-0',
    }),
  );

  return (
    <div className="mb-2 flex items-center justify-between gap-5" ref={ref}>
      <ul className="text-muted-foreground flex gap-2 overflow-auto py-3">
        <li className="leading-none">
          <Link className={classNameItem} aria-label={t('home')} href="/">
            <Home />
          </Link>
        </li>

        {items.map(item => (
          <li key={item.id} className="flex shrink-0 items-center gap-2">
            <ChevronRight className="size-4" />
            <Link className={classNameItem} href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
};
