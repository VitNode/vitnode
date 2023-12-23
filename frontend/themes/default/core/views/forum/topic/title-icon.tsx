import type { ReactNode } from 'react';

import { cx } from '@/functions/classnames';
import { Badge } from '@/components/ui/badge';

interface Props {
  children: ReactNode;
  className?: string;
}

export const TitleIconTopic = ({ children, className }: Props) => {
  return (
    <Badge
      variant="default"
      className={cx('px-3 py-1 [&>svg]:size-4 flex-shrink-0 text-sm', className)}
    >
      {children}
    </Badge>
  );
};
