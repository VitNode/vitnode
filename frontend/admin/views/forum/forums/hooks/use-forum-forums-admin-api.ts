import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Admin__Show,
  type ShowForumForumsWithParent,
  type Forum_Forums__Admin__ShowQuery,
  type Forum_Forums__Admin__ShowQueryVariables
} from '@/graphql/hooks';

export interface Forum_Forums__Admin__ShowQueryItem
  extends Omit<ShowForumForumsWithParent, 'parent'> {}

export const useForumForumsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS_ADMIN],
    queryFn: async ({ pageParam, signal }) =>
      await fetcher<Forum_Forums__Admin__ShowQuery, Forum_Forums__Admin__ShowQueryVariables>({
        query: Forum_Forums__Admin__Show,
        variables: pageParam,
        signal
      }),
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
    }
  });

  const data: Forum_Forums__Admin__ShowQueryItem[] = useMemo(() => {
    return query.data?.pages.flatMap(({ forum_forums__admin__show: { edges } }) => edges) ?? [];
  }, [query.data]);

  return {
    ...query,
    data
  };
};
