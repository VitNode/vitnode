import { ForumsForumAdminView } from "@/admin/forum/views/forums/forums-forum-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Show,
  type Admin__Forum_Forums__ShowQuery,
  type Admin__Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

export default async function Page() {
  const { data } = await fetcher<
    Admin__Forum_Forums__ShowQuery,
    Admin__Forum_Forums__ShowQueryVariables
  >({
    query: Admin__Forum_Forums__Show
  });

  return <ForumsForumAdminView {...data} />;
}
