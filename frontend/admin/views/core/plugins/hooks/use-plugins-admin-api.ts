import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Plugins__Admin__Show,
  type Core_Plugins__Admin__ShowQuery,
  type Core_Plugins__Admin__ShowQueryVariables
} from '@/graphql/hooks';

export const usePluginsAdminAPI = () => {
  const query = useInfiniteQuery({
    queryKey: [APIKeys.PLUGINS],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await fetcher<
        Core_Plugins__Admin__ShowQuery,
        Core_Plugins__Admin__ShowQueryVariables
      >({
        query: Core_Plugins__Admin__Show,
        variables: pageParam,
        signal
      });

      return data;
    },
    initialPageParam: {
      first: 10
    },
    getNextPageParam: ({ core_plugins__admin__show: { pageInfo } }) => {
      if (pageInfo.hasNextPage) {
        return {
          first: 10,
          cursor: pageInfo.endCursor
        };
      }
    }
  });

  const data = useMemo(() => {
    return query.data?.pages.flatMap(({ core_plugins__admin__show: { edges } }) => edges) ?? [];
  }, [query.data]);

  return {
    ...query,
    data
  };
};
