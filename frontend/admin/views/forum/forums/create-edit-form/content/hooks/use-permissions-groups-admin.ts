import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Show_Short,
  type Core_Groups__Admin__Show_ShortQuery,
  type Core_Groups__Admin__Show_ShortQueryVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_FORUMS_ADMIN, { search: searchValue }],
    queryFn: async () => {
      return await fetcher<
        Core_Groups__Admin__Show_ShortQuery,
        Core_Groups__Admin__Show_ShortQueryVariables
      >({
        query: Core_Groups__Admin__Show_Short,
        variables: {
          search: searchValue
        }
      });
    },
    placeholderData: previousData => previousData,
    refetchOnMount: true
  });

  return { ...query, data: query.data?.core_groups__admin__show.edges ?? [] };
};
