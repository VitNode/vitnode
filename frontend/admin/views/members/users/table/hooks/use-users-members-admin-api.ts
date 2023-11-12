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
    'avatar_color' | 'email' | 'group' | 'id' | 'joined' | 'name' | 'name_seo' | 'avatar'
  > {}

export const useUsersMembersAdminAPI = () => {
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor')
  };

  return useQuery({
    queryKey: [APIKeys.USERS_MEMBERS, { ...pagination }],
    queryFn: async () => {
      const defaultFirst = !pagination.last ? 10 : null;

      return await fetcher<Show_Admin_MembersQuery, Show_Admin_MembersQueryVariables>({
        query: Show_Admin_Members,
        variables: {
          first: pagination.first ? +pagination.first : defaultFirst,
          last: pagination.last ? +pagination.last : null,
          cursor: pagination.cursor
        }
      });
    },
    placeholderData: previousData => previousData
  });
};
