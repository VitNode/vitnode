import { useTranslations } from "next-intl";
import { Lock, MessagesSquare } from "lucide-react";

import { badgeVariants } from "@/components/ui/badge";
import { Link } from "@/utils/i18n";
import { Forum_Topics__ShowQuery } from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { UserLink } from "@/components/user/link/user-link";
import { ActionsTopic } from "./actions/actions-topic";
import { TitleIconTopic } from "./title-icon";
import { PostTopic } from "./posts/post/post";
import { CreatePost } from "./posts/create/create-post";
import { HeaderPosts } from "./posts/header/header-posts";
import { LoadMorePosts } from "./posts/load-more/load-more-posts";
import { ListPosts } from "./posts/list";
import { AnimatePresenceClient } from "@/components/animations/animate-presence";

export interface TopicViewProps {
  data: Forum_Topics__ShowQuery;
}

export default function TopicView({ data: dataApi }: TopicViewProps) {
  const t = useTranslations("forum.topics");
  const { convertNameToLink, convertText } = useTextLang();

  const {
    forum_posts__show: { edges: edgesPosts, lastEdges, pageInfo },
    forum_topics__show: { edges }
  } = dataApi;
  const data = edges.at(0);
  if (!data) return null;
  const {
    breadcrumbs,
    content,
    created,
    id,
    locked,
    permissions,
    title,
    user
  } = data;
  const forum = breadcrumbs.at(-1);
  if (!forum) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 mb-5">
        <h1 className="text-2xl font-semibold tracking-tight leading-tight flex-1 break-words">
          {convertText(title)}
        </h1>

        <div className="flex items-center gap-2 flex-wrap text-sm">
          {locked && (
            <TitleIconTopic variant="destructive">
              <Lock /> {t("closed")}
            </TitleIconTopic>
          )}

          <span>
            {t.rich("user_wrote_in_forum", {
              user: () => <UserLink className="font-semibold" user={user} />,
              forum: () => (
                <Link
                  href={`/forum/${convertNameToLink({ ...forum })}`}
                  className={badgeVariants({
                    className: "[&>svg]:size-3"
                  })}
                >
                  <MessagesSquare /> {convertText(forum.name)}
                </Link>
              )
            })}
          </span>
        </div>
      </div>

      <PostTopic
        post_id={id}
        content={content}
        user={user}
        created={created}
        disableInitialAnimation
        permissions={permissions}
        customMoreMenu={
          <ActionsTopic id={id} state={{ locked }} permissions={permissions} />
        }
      />

      <HeaderPosts totalComments={pageInfo.totalPostsCount} />

      <AnimatePresenceClient key={`topic_posts_${id}`} initial={false}>
        {edgesPosts.length > 0 && (
          <>
            <ListPosts
              id="first"
              edges={
                pageInfo.totalCount <= pageInfo.limit * 2
                  ? [...edgesPosts, ...lastEdges]
                  : edgesPosts
              }
              permissions={permissions}
            />

            {pageInfo.totalCount > pageInfo.limit * 2 && (
              <>
                <LoadMorePosts
                  totalCount={pageInfo.totalCount}
                  initialCount={edgesPosts.length + lastEdges.length}
                  limit={pageInfo.limit}
                  permissions={permissions}
                />
                <ListPosts
                  id="last"
                  permissions={permissions}
                  edges={lastEdges}
                />
              </>
            )}
          </>
        )}
      </AnimatePresenceClient>
      {permissions.can_reply && <CreatePost className="mt-5 -mx-4 sm:mx-0" />}
    </div>
  );
}
