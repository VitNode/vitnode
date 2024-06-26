import { useQuery } from '@tanstack/react-query';

import { queryApi } from './query-api';

interface Args {
  searchValue: string;
}

export const usePermissionsGroupsAdminAPI = ({ searchValue }: Args) => {
  const query = useQuery({
    queryKey: ['Admin__Core_Groups__Show_Short', { search: searchValue }],
    queryFn: async () => queryApi({ search: searchValue }),
    placeholderData: previousData => previousData,
    refetchOnMount: true,
  });

  return { ...query, data: query.data?.admin__core_groups__show.edges ?? [] };
};
