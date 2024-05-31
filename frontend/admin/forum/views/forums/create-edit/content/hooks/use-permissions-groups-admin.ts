import { useQuery } from "@tanstack/react-query";

import { queryApi } from "./query-api";
import { APIKeys } from "@/utils/graphql/api-keys";

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_FORUMS_ADMIN, { search: searchValue }],
    queryFn: async () => queryApi({ search: searchValue }),
    placeholderData: previousData => previousData,
    refetchOnMount: true
  });

  return { ...query, data: query.data?.admin__core_groups__show.edges ?? [] };
};
