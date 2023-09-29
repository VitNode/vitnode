import cx from 'clsx';
import { Check } from 'lucide-react';
import { ReactNode } from 'react';

import { Link } from '@/i18n';

interface Props {
  children: ReactNode;
  active?: boolean;
}

export const ItemQuickMenu = ({ active, children }: Props) => {
  return (
    <Link
      href="/"
      className={cx('flex-1 text-center h-14 flex items-center justify-center flex-col px-2', {
        'text-primary': active
      })}
    >
      <Check />
      <span
        className={cx('text-sm', {
          'font-semibold': active
        })}
      >
        {children}
      </span>
    </Link>
  );
};
