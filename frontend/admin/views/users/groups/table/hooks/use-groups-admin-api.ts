import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  Show_Core_Groups,
  Show_Core_GroupsQuery,
  Show_Core_GroupsQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export const useGroupsAdminAPI = () => {
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor')
  };

  return useQuery({
    queryKey: [APIKeys.GROUPS, { ...pagination }],
    queryFn: async () => {
      const defaultFirst = !pagination.last ? 10 : null;

      return await fetcher<Show_Core_GroupsQuery, Show_Core_GroupsQueryVariables>({
        query: Show_Core_Groups,
        variables: {
          first: pagination.first ? +pagination.first : defaultFirst,
          last: pagination.last ? +pagination.last : null,
          cursor: pagination.cursor ? +pagination.cursor : null
        }
      });
    },
    placeholderData: previousData => previousData
  });
};
