import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  ShowAdminMembers,
  Show_Admin_Members,
  Show_Admin_MembersQuery,
  Show_Admin_MembersQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export interface UsersMembersAdminAPIDataType
  extends Pick<
    ShowAdminMembers,
    'avatar_color' | 'email' | 'group' | 'id' | 'joined' | 'name' | 'avatar'
  > {}

export const useUsersMembersAdminAPI = () => {
  const searchParams = useSearchParams();
  const params = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor'),
    search: searchParams.get('search') ?? ''
  };

  return useQuery({
    queryKey: [APIKeys.USERS_MEMBERS, { ...params }],
    queryFn: async ({ signal }) => {
      const defaultFirst = !params.last ? 10 : null;

      return await fetcher<Show_Admin_MembersQuery, Show_Admin_MembersQueryVariables>({
        query: Show_Admin_Members,
        variables: {
          first: params.first ? +params.first : defaultFirst,
          last: params.last ? +params.last : null,
          cursor: params.cursor,
          search: params.search
        },
        signal
      });
    },
    placeholderData: previousData => previousData
  });
};
