import { useQuery } from '@tanstack/react-query';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import { Core_Languages__Show } from '@/graphql/hooks';
import type {
  Core_Languages__ShowQuery,
  Core_Languages__ShowQueryVariables
} from '@/graphql/hooks';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export const useLangsAdminAPI = () => {
  const defaultPageSize = 10 as const;
  const variables = usePaginationAPI({
    defaultPageSize
  });

  const query = useQuery({
    queryKey: [APIKeys.LANGUAGES_ADMIN, { ...variables }],
    queryFn: async () => {
      const { data } = await fetcher<Core_Languages__ShowQuery, Core_Languages__ShowQueryVariables>(
        {
          query: Core_Languages__Show,
          variables
        }
      );

      return data;
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
