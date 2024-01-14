import { useTranslations } from 'next-intl';
import { Lock, MessagesSquare } from 'lucide-react';

import { badgeVariants } from '@/components/ui/badge';
import { Link } from '@/i18n';
import type { Forum_Topics__ShowQuery } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { UserLink } from '@/components/user/link/user-link';
import { ActionsTopic } from './actions/actions-topic';
import { TitleIconTopic } from './title-icon';
import { PostTopic } from './post/post';
import { MetaTagTopic } from './meta-tags/meta-tag';
import { CreatePost } from './post/create/create-post';
import { HeaderPosts } from './post/header/header-posts';
import { LoadMorePosts } from './load-more/load-more-posts';

interface Props {
  data: Forum_Topics__ShowQuery;
}

export const TopicView = ({ data: dataApi }: Props) => {
  const t = useTranslations('forum.topics');
  const { convertNameToLink, convertText } = useTextLang();

  const {
    forum_posts__show: { edges: edgesPosts, pageInfo },
    forum_topics__show: { edges }
  } = dataApi;
  const data = edges.at(0);
  if (!data) return null;
  const { content, created, forum, id, locked, title, user } = data;

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex gap-4 items-center sm:flex-row flex-col">
            <div className="order-1 sm:order-2">
              <ActionsTopic id={id} state={{ locked }} />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight leading-tight sm:order-1 order-2 flex-1">
              {convertText(title)}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {locked && (
              <TitleIconTopic variant="destructive">
                <Lock /> {t('closed')}
              </TitleIconTopic>
            )}

            <span>
              {t.rich('user_wrote_in_forum', {
                user: () => <UserLink className="font-semibold" user={user} />,
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

        <PostTopic id={id} content={content} user={user} created={created} />

        <HeaderPosts totalComments={pageInfo.totalCount} />

        {edgesPosts.length > 0 && (
          <div className="flex flex-col gap-5 relative after:absolute after:top-0 after:left-6 after:w-1 after:h-full after:block after:-z-10 after:bg-border">
            {edgesPosts.map(edge => {
              if (edge.__typename === 'ShowPostsForums') {
                return <PostTopic key={edge.id} {...edge} />;
              }

              if (edge.__typename === 'ShowPostsForumsMetaTags') {
                return <MetaTagTopic key={edge.id} {...edge} />;
              }

              return null;
            })}
          </div>
        )}

        <LoadMorePosts count={100} />

        <CreatePost className="mt-5" />
      </div>

      <div className="w-1/4">Sidebar</div>
    </div>
  );
};
