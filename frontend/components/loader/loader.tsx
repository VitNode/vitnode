import { Loader2 } from 'lucide-react';

import { cx } from '@/functions/classnames';

interface Props {
  small?: boolean;
}

export const Loader = ({ small }: Props) => {
  return (
    <Loader2
      className={cx('mr-2 h-4 w-4 animate-spin', {
        'h-4 w-4': small
      })}
    />
  );
};
