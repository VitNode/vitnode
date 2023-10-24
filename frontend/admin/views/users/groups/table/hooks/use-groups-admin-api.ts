import { useInfiniteQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Show_Core_Groups,
  Show_Core_GroupsQuery,
  Show_Core_GroupsQueryVariables
} from '@/graphql/hooks';

export const useGroupsAdminAPI = () => {
  return useInfiniteQuery({
    queryKey: [],
    queryFn: async () =>
      await fetcher<Show_Core_GroupsQuery, Show_Core_GroupsQueryVariables>({
        query: Show_Core_Groups,
        variables: {
          first: 10
        }
      }),
    initialPageParam: {
      cursor: ''
    },
    getNextPageParam: lastPage => {
      if (
        lastPage.show_core_groups.pageInfo.hasNextPage &&
        lastPage.show_core_groups.pageInfo.endCursor
      ) {
        return {
          cursor: lastPage.show_core_groups.pageInfo.endCursor
        };
      }
    }
  });
};
