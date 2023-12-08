import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  ShowForumForumsWithParent,
  Show_Forum_Forums_Admin,
  Show_Forum_Forums_AdminQuery,
  Show_Forum_Forums_AdminQueryVariables
} from '@/graphql/hooks';

export interface Show_Forum_ForumsQueryItem extends Omit<ShowForumForumsWithParent, 'parent'> {}

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam, signal }) =>
      await fetcher<Show_Forum_Forums_AdminQuery, Show_Forum_Forums_AdminQueryVariables>({
        query: Show_Forum_Forums_Admin,
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

  const data: Show_Forum_ForumsQueryItem[] = useMemo(() => {
    return query.data?.pages.flatMap(({ show_forum_forums: { edges } }) => edges) ?? [];
  }, [query.data]);

  return {
    ...query,
    data
  };
};
