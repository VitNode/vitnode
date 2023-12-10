import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Show_Short,
  Core_Groups__Admin__Show_ShortQuery,
  Core_Groups__Admin__Show_ShortQueryVariables
} from '@/graphql/hooks';

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = useState('');

  const api = useQuery({
    queryKey: [APIKeys.SHORT_GROUPS_MEMBERS, { textSearch }],
    queryFn: async ({ signal }) =>
      await fetcher<
        Core_Groups__Admin__Show_ShortQuery,
        Core_Groups__Admin__Show_ShortQueryVariables
      >({
        query: Core_Groups__Admin__Show_Short,
        variables: {
          first: 10,
          search: textSearch
        },
        signal
      })
  });

  return { ...api, setTextSearch, textSearch };
};
