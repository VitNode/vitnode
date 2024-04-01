import { useTranslations } from "next-intl";
import { Lock, MessagesSquare } from "lucide-react";

import { badgeVariants } from "@/components/ui/badge";
import { Link } from "@/i18n";
import type { Forum_Topics__ShowQuery } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { UserLink } from "@/components/user/link/user-link";
import { ActionsTopic } from "./actions/actions-topic";
import { TitleIconTopic } from "./title-icon";
import { PostTopic } from "./posts/post/post";
import { CreatePost } from "./posts/create/create-post";
import { HeaderPosts } from "./posts/header/header-posts";
import { LoadMorePosts } from "./posts/load-more/load-more-posts";
import { WrapperPosts } from "./posts/wrapper/wrapper";
import { ListPosts } from "./posts/list";
import { AnimatePresenceClient } from "@/components/animations/animate-presence";

export interface TopicViewProps {
  data: Forum_Topics__ShowQuery;
  firstEdges: number;
}

export default function TopicView({
  data: dataApi,
  firstEdges
}: TopicViewProps): JSX.Element | null {
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
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
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
                user: (): JSX.Element => (
                  <UserLink className="font-semibold" user={user} />
                ),
                forum: (): JSX.Element => (
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

        <WrapperPosts>
          <PostTopic
            post_id={id}
            content={content}
            user={user}
            created={created}
            disableInitialAnimation
            customMoreMenu={
              <ActionsTopic
                id={id}
                state={{ locked }}
                permissions={permissions}
              />
            }
          />

          <HeaderPosts totalComments={pageInfo.totalCount} />

          <AnimatePresenceClient key={`topic_posts_${id}`} initial={false}>
            {edgesPosts.length > 0 && (
              <>
                <ListPosts
                  id="first"
                  edges={
                    pageInfo.totalCount <= firstEdges * 2
                      ? [...edgesPosts, ...lastEdges]
                      : edgesPosts
                  }
                />

                {pageInfo.totalCount > firstEdges * 2 && pageInfo.endCursor && (
                  <>
                    <LoadMorePosts
                      totalCount={pageInfo.totalCount}
                      endCursor={pageInfo.endCursor}
                      initialCount={edgesPosts.length + lastEdges.length}
                      firstEdges={firstEdges}
                    />
                    <ListPosts id="last" edges={lastEdges} />
                  </>
                )}
              </>
            )}
          </AnimatePresenceClient>

          {permissions.can_reply && <CreatePost className="mt-5" />}
        </WrapperPosts>
      </div>
    </div>
  );
}
