import { cookies } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { ForumsForumAdminView } from "@/admin/forum/views/forums/forums-forum-admin-view";
import getQueryClient from "@/functions/get-query-client";
import { fetcher } from "@/graphql/fetcher";
import { APIKeys } from "@/graphql/api-keys";
import {
  Admin__Forum_Forums__Show,
  type Admin__Forum_Forums__ShowQuery,
  type Admin__Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam }) => {
      const { data } = await fetcher<
        Admin__Forum_Forums__ShowQuery,
        Admin__Forum_Forums__ShowQueryVariables
      >({
        query: Admin__Forum_Forums__Show,
        variables: pageParam,
        headers: {
          Cookie: cookies().toString()
        }
      });

      return data;
    },
    initialPageParam: {
      first: 10
    },
    getNextPageParam: ({ admin__forum_forums__show: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    },
    pages: 1
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ForumsForumAdminView />
    </HydrationBoundary>
  );
}
