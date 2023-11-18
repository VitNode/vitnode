import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Short_Show_Groups_Admin_Members,
  Short_Show_Groups_Admin_MembersQuery,
  Short_Show_Groups_Admin_MembersQueryVariables
} from '@/graphql/hooks';

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = useState('');

  const api = useQuery({
    queryKey: [APIKeys.SHORT_GROUPS_MEMBERS, { textSearch }],
    queryFn: async ({ signal }) =>
      await fetcher<
        Short_Show_Groups_Admin_MembersQuery,
        Short_Show_Groups_Admin_MembersQueryVariables
      >({
        query: Short_Show_Groups_Admin_Members,
        variables: {
          first: 10,
          search: textSearch
        },
        signal
      })
  });

  return { ...api, setTextSearch, textSearch };
};
