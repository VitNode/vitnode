import { useTranslations } from 'next-intl';
import { BookOpen, MessagesSquare, MoreHorizontal } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { DateFormat } from '@/components/date-format/date-format';
import { badgeVariants } from '@/components/ui/badge';
import { Link } from '@/i18n';
import { Button } from '@/components/ui/button';
import type { Forum_Topics__ShowQuery } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';
import { LinkUser } from '@/components/user/link/link-user';
import { GroupFormat } from '@/components/groups/group-format';
import { ActionsTopic } from './actions-topic';
import { TitleIconTopic } from './title-icon';

interface Props {
  data: Forum_Topics__ShowQuery;
}

export const TopicView = ({ data: dataApi }: Props) => {
  const t = useTranslations('forum.topics');
  const { convertNameToLink, convertText } = useTextLang();

  const {
    forum_topics__show: { edges }
  } = dataApi;
  const data = edges.at(0);

  if (!data) return null;
  const { author, content, forum, id, locked, title } = data;

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center sm:flex-row flex-col">
            <div className="order-1 sm:order-2">
              <ActionsTopic state={{ locked }} />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight leading-tight sm:order-1 order-2 flex-1">
              {convertText(title)}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!locked && (
              <TitleIconTopic>
                <BookOpen /> {t('open')}
              </TitleIconTopic>
            )}

            <span>
              {t.rich('user_wrote_in_forum', {
                user: () => <LinkUser className="font-semibold" user={author} />,
                forum: () => (
                  <Link
                    href={`/forum/${convertNameToLink({ ...forum })}`}
                    className={badgeVariants({
                      className: '[&>svg]:size-3'
                    })}
                  >
                    <MessagesSquare /> {convertText(forum.name)}
                  </Link>
                )
              })}
            </span>
          </div>
        </div>

        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="p-4 pb-0 flex gap-4 items-center">
              <div className="flex-1 flex gap-2 items-center">
                <AvatarUser sizeInRem={2} user={author} />
                <div className="flex flex-col leading-none">
                  <div>
                    {t.rich('username_format', {
                      user: () => <LinkUser className="font-semibold" user={author} />,
                      date: () => (
                        <span className="text-muted-foreground text-sm">
                          <DateFormat date={1702920914} />
                        </span>
                      )
                    })}
                  </div>
                  <GroupFormat className="text-muted-foreground text-sm" group={author.group} />
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </div>

            <div className="p-4">
              <ReadOnlyEditor id={`topic_${id}`} value={content} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-1/4">Sidebar</div>
    </div>
  );
};
