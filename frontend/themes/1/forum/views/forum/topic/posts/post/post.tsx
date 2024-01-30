import { useTranslations } from 'next-intl';
import { MoreHorizontal } from 'lucide-react';

import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { UserLink } from '@/components/user/link/user-link';
import { DateFormat } from '@/components/date-format/date-format';
import { GroupFormat } from '@/components/groups/group-format';
import { Button } from '@/components/ui/button';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';
import type { TextLanguage, User } from '@/graphql/hooks';
import { DivMotion } from '@/components/animations/div-motion';

interface Props {
  content: TextLanguage[];
  created: number;
  post_id: number;
  user: User;
  disableInitialAnimation?: boolean;
}

export const PostTopic = ({
  content,
  created,
  disableInitialAnimation,
  post_id: id,
  user
}: Props) => {
  const t = useTranslations('forum.topics');
  const tCore = useTranslations('core');

  return (
    <DivMotion
      key={`post_${id}`}
      initial={disableInitialAnimation ? false : { opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-4 pb-0 flex gap-4 items-center">
        <div className="flex-1 flex gap-2 items-center">
          <AvatarUser sizeInRem={2} user={user} />
          <div className="flex flex-col leading-none">
            <div>
              {t.rich('username_format', {
                user: () => <UserLink className="font-semibold" user={user} />,
                group: () => <GroupFormat className="text-sm" group={user.group} />
              })}
            </div>
            <DateFormat className="text-muted-foreground text-sm" date={created} />
          </div>
        </div>

        <Button variant="ghost" size="icon" tooltip={tCore('open_menu')}>
          <MoreHorizontal />
        </Button>
      </div>

      <div className="p-4">
        <ReadOnlyEditor id={`post_${id}`} value={content} />
      </div>
    </DivMotion>
  );
};
