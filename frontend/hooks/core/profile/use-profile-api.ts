import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables
} from '@/graphql/hooks';

export const useProfileAPI = () => {
  const { id } = useParams();

  const current = useQuery({
    queryKey: [APIKeys.PROFILE, { id }],
    queryFn: async () =>
      await fetcher<Core_Members__ProfilesQuery, Core_Members__ProfilesQueryVariables>({
        query: Core_Members__Profiles,
        variables: {
          first: 1,
          findByIds: Array.isArray(id) ? id : [id]
        }
      })
  });

  const data = current.data?.core_members__show.edges.at(0);

  return { ...current, data };
};
