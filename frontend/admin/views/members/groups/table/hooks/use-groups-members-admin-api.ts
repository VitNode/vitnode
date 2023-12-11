import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Show,
  Core_Groups__Admin__ShowQuery,
  Core_Groups__Admin__ShowQueryVariables,
  ShowAdminGroupsSortingColumnEnum
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export const useGroupMembersAdminAPI = () => {
  const defaultPageSize = 25;
  const variables = usePaginationAPI({
    sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize
  });

  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN, { ...variables }],
    queryFn: async () => {
      return await fetcher<Core_Groups__Admin__ShowQuery, Core_Groups__Admin__ShowQueryVariables>({
        query: Core_Groups__Admin__Show,
        variables
      });
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
