import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  ShowAdminMembers,
  ShowAdminMembersSortingColumnEnum,
  Core_Members__Admin__Show,
  Core_Members__Admin__ShowQuery,
  Core_Members__Admin__ShowQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export interface UsersMembersAdminAPIDataType
  extends Pick<
    ShowAdminMembers,
    'avatar_color' | 'email' | 'group' | 'id' | 'joined' | 'name' | 'avatar'
  > {}

export const useUsersMembersAdminAPI = () => {
  const defaultPageSize = 10 as const;
  const searchParams = useSearchParams();
  const variables = {
    ...usePaginationAPI({
      sortByEnum: ShowAdminMembersSortingColumnEnum,
      search: true,
      defaultPageSize
    }),
    groups: searchParams.getAll('groups') ?? []
  };

  const query = useQuery({
    queryKey: [APIKeys.USERS_MEMBERS, { ...variables }],
    queryFn: async ({ signal }) =>
      await fetcher<Core_Members__Admin__ShowQuery, Core_Members__Admin__ShowQueryVariables>({
        query: Core_Members__Admin__Show,
        variables,
        signal
      }),
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
