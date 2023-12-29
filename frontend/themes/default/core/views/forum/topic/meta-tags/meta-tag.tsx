import { Lock, Tag, Unlock, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DateFormat } from '@/components/date-format/date-format';
import type { ShowPostsForumsMetaTags } from '@/graphql/hooks';
import { cx } from '@/functions/classnames';
import { UserLink } from '@/components/user/link/user-link';

const icon: {
  [key: string]: LucideIcon;
} = {
  lock: Lock,
  unlock: Unlock
};

export const MetaTagTopic = ({
  action,
  created,
  member
}: Pick<ShowPostsForumsMetaTags, 'created' | 'action' | 'member'>) => {
  const t = useTranslations('forum.topics.actions.meta');
  const Icon = icon[action] ? icon[action] : Tag;

  return (
    <div className="ml-2.5 flex gap-4 items-center">
      <div
        className={cx(
          'border size-8 bg-border [&>svg]:size-4 flex items-center justify-center rounded-full',
          {
            'bg-destructive border-destructive': action === 'lock'
          }
        )}
      >
        <Icon />
      </div>

      <span className="text-muted-foreground">
        {t.rich(`meta_${action}`, {
          user: () => <UserLink user={member} />,
          date: () => <DateFormat date={created} />
        })}
      </span>
    </div>
  );
};
