import { ForumsForumAdminView } from "@/admin/forum/views/forums/forums-forum-admin-view";
import {
  Admin__Forum_Forums__Show,
  Admin__Forum_Forums__ShowQuery,
  Admin__Forum_Forums__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export default async function Page() {
  const { data } = await fetcher<
    Admin__Forum_Forums__ShowQuery,
    Admin__Forum_Forums__ShowQueryVariables
  >({
    query: Admin__Forum_Forums__Show
  });

  return <ForumsForumAdminView {...data} />;
}
