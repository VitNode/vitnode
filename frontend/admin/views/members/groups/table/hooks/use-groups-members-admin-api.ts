import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Show_Admin_Groups,
  Show_Admin_GroupsQuery,
  Show_Admin_GroupsQueryVariables,
  ShowAdminGroupsSortingColumnEnum
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export const useGroupMembersAdminAPI = () => {
  const defaultPageSize = 10;
  const variables = usePaginationAPI({
    sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize
  });

  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS, { ...variables }],
    queryFn: async () => {
      return await fetcher<Show_Admin_GroupsQuery, Show_Admin_GroupsQueryVariables>({
        query: Show_Admin_Groups,
        variables
      });
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
