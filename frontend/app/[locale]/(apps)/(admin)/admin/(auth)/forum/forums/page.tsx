import { cookies } from 'next/headers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { ForumsForumAdminView } from '@/admin/views/forum/forums/forums-forum-admin-view';
import getQueryClient from '@/functions/get-query-client';
import { fetcher } from '@/graphql/fetcher';
import { APIKeys } from '@/graphql/api-keys';
import {
  Forum_Forums__Admin__Show,
  type Forum_Forums__Admin__ShowQuery,
  type Forum_Forums__Admin__ShowQueryVariables
} from '@/graphql/hooks';

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam }) => {
      const { data } = await fetcher<
        Forum_Forums__Admin__ShowQuery,
        Forum_Forums__Admin__ShowQueryVariables
      >({
        query: Forum_Forums__Admin__Show,
        variables: pageParam,
        headers: {
          Cookie: cookies().toString()
        }
      });

      return data;
    },
    initialPageParam: {
      first: 10,
      cursor: ''
    },
    getNextPageParam: ({ forum_forums__admin__show: { pageInfo } }) => {
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
