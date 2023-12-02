import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  ShowAdminMembers,
  ShowAdminMembersSortingColumnEnum,
  Show_Admin_Members,
  Show_Admin_MembersQuery,
  Show_Admin_MembersQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export interface UsersMembersAdminAPIDataType
  extends Pick<
    ShowAdminMembers,
    'avatar_color' | 'email' | 'group' | 'id' | 'joined' | 'name' | 'avatar'
  > {}

export const useUsersMembersAdminAPI = () => {
  const defaultPageSize = 10;
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
    queryFn: async ({ signal }) => {
      return await fetcher<Show_Admin_MembersQuery, Show_Admin_MembersQueryVariables>({
        query: Show_Admin_Members,
        variables,
        signal
      });
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
