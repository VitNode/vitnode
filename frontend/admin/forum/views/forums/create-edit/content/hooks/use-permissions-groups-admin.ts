import { useQuery } from "@tanstack/react-query";

import { APIKeys } from "@/graphql/api-keys";
import { queryApi } from "./query-api";

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: [APIKeys.GROUPS_MEMBERS_FORUMS_ADMIN, { search: searchValue }],
    queryFn: async () => await queryApi({ search: searchValue }),
    placeholderData: previousData => previousData,
    refetchOnMount: true
  });

  return { ...query, data: query.data?.admin__core_groups__show.edges ?? [] };
};
