import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Profiles_Core_Members,
  Profiles_Core_MembersQuery,
  Profiles_Core_MembersQueryVariables
} from '@/graphql/hooks';

export const useProfileAPI = () => {
  const { id } = useParams();

  const current = useQuery({
    queryKey: [APIKeys.PROFILE, { id }],
    queryFn: async () =>
      await fetcher<Profiles_Core_MembersQuery, Profiles_Core_MembersQueryVariables>({
        query: Profiles_Core_Members,
        variables: {
          first: 1,
          findByIds: Array.isArray(id) ? id : [id]
        }
      })
  });

  const data = current.data?.show_core_members.edges.at(0);

  return { ...current, data };
};
