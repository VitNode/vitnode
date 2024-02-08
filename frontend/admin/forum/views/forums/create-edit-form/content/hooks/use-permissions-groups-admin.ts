import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Groups__Show_Short,
  type Admin__Core_Groups__Show_ShortQuery,
  type Admin__Core_Groups__Show_ShortQueryVariables
} from "@/graphql/hooks";
import { APIKeys } from "@/graphql/api-keys";

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_FORUMS_ADMIN, { search: searchValue }],
    queryFn: async () => {
      const { data } = await fetcher<
        Admin__Core_Groups__Show_ShortQuery,
        Admin__Core_Groups__Show_ShortQueryVariables
      >({
        query: Admin__Core_Groups__Show_Short,
        variables: {
          search: searchValue
        }
      });

      return data;
    },
    placeholderData: previousData => previousData,
    refetchOnMount: true
  });

  return { ...query, data: query.data?.admin__core_groups__show.edges ?? [] };
};
