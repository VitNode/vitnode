import { useInfiniteQuery } from '@tanstack/react-query';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Show_Forum_Forums,
  Show_Forum_ForumsQuery,
  Show_Forum_ForumsQueryVariables
} from '@/graphql/hooks';

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam, signal }) =>
      await fetcher<Show_Forum_ForumsQuery, Show_Forum_ForumsQueryVariables>({
        query: Show_Forum_Forums,
        variables: pageParam,
        signal
      }),
    initialPageParam: {
      first: 10,
      cursor: ''
    },
    getNextPageParam: ({ show_forum_forums: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    }
  });

  const data = query.data?.pages.flatMap(({ show_forum_forums: { edges } }) => edges) ?? [];

  return {
    ...query,
    data
  };
};
