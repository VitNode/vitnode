import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetcher } from '@/graphql/fetcher';
import {
  Forum_Forums__Show,
  Forum_Forums__ShowQuery,
  Forum_Forums__ShowQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export const useShowForumsAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.FORUMS],
    queryFn: async () =>
      await fetcher<Forum_Forums__ShowQuery, Forum_Forums__ShowQueryVariables>({
        query: Forum_Forums__Show
      }),
    initialPageParam: {
      first: 10,
      cursor: ''
    },
    getNextPageParam: lastPage => {
      const { pageInfo } = lastPage.forum_forums__show;

      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    }
  });

  const data = useMemo(() => {
    return query.data?.pages.flatMap(page => page.forum_forums__show.edges) ?? [];
  }, [query.data]);

  return { ...query, data };
};
