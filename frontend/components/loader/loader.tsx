import { Loader2 } from 'lucide-react';

import { cx } from '@/functions/classnames';

interface Props {
  small?: boolean;
}

export const Loader = ({ small }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <Loader2
        className={cx('h-10 w-10 animate-spin', {
          'h-4 w-4': small
        })}
      />
    </div>
  );
};
