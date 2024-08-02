import { cn } from '@/helpers/classnames';
import { GroupUser } from '@/graphql/types';

import { useTextLang } from '../../../hooks/use-text-lang';

export const GroupFormat = ({
  className,
  group: { name, color },
}: {
  group: Omit<GroupUser, '__typename'>;
  className?: string;
}) => {
  const { convertText } = useTextLang();

  return (
    <span
      className={cn('font-medium text-[--group-color]', className)}
      style={{ '--group-color': color } as React.CSSProperties}
    >
      {convertText(name)}
    </span>
  );
};
