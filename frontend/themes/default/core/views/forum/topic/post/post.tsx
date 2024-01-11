import { useTranslations } from 'next-intl';
import { MoreHorizontal } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { UserLink } from '@/components/user/link/user-link';
import { DateFormat } from '@/components/date-format/date-format';
import { GroupFormat } from '@/components/groups/group-format';
import { Button } from '@/components/ui/button';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';
import type { TextLanguage, User } from '@/graphql/hooks';

interface Props {
  content: TextLanguage[];
  created: number;
  id: number;
  user: User;
}

export const PostTopic = ({ content, created, id, user }: Props) => {
  const t = useTranslations('forum.topics');
  const tCore = useTranslations('core');

  return (
    <Card>
      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  );
};
