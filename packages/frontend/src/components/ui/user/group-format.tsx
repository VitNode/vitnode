import { GroupUser } from '@/graphql/types';
import { cn } from '@/helpers/classnames';

import { useTextLang } from '../../../hooks/use-text-lang';

export const GroupFormat = ({
  className,
  group: { name, color },
}: {
  className?: string;
  group: Omit<GroupUser, '__typename'>;
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
