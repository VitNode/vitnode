import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import { Core_Groups__Admin__Show, ShowAdminGroupsSortingColumnEnum } from '@/graphql/hooks';
import type {
  Core_Groups__Admin__ShowQuery,
  Core_Groups__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export const useGroupMembersAdminAPI = () => {
  const defaultPageSize = 10 as const;
  const variables = usePaginationAPI({
    sortByEnum: ShowAdminGroupsSortingColumnEnum,
    defaultPageSize
  });

  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_ADMIN, { ...variables }],
    queryFn: async () => {
      const { data } = await fetcher<
        Core_Groups__Admin__ShowQuery,
        Core_Groups__Admin__ShowQueryVariables
      >({
        query: Core_Groups__Admin__Show,
        variables
      });

      return data;
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
