import { useQuery } from '@tanstack/react-query';

import { getGroupsShortApi } from '../../../graphql/get-groups-short-api';

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: ['Admin__Core_Groups__Show_Short', { search: searchValue }],
    queryFn: async () => {
      const mutation = await getGroupsShortApi({ search: searchValue });

      if (!mutation.data) {
        throw mutation.error;
      }

      return mutation.data;
    },
    placeholderData: previousData => previousData,
    refetchOnMount: true,
  });

  return { ...query, data: query.data?.admin__core_groups__show.edges ?? [] };
};
