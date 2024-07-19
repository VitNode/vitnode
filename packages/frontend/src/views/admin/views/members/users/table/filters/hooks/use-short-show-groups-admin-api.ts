import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getGroupsShortApi } from '@/graphql/get-groups-short-api';

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = React.useState('');

  const api = useQuery({
    queryKey: ['SHORT_GROUPS_MEMBERS', { textSearch }],
    queryFn: async () => {
      const mutation = await getGroupsShortApi({ search: textSearch });

      if (!mutation.data) {
        throw mutation.error;
      }

      return mutation.data;
    },
    refetchOnMount: true,
  });

  return { ...api, setTextSearch };
};
