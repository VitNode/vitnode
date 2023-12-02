import { useQuery } from '@tanstack/react-query';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Show_Core_Languages,
  Show_Core_LanguagesQuery,
  Show_Core_LanguagesQueryVariables
} from '@/graphql/hooks';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

export const useLangsAdminAPI = () => {
  const defaultPageSize = 10;
  const variables = usePaginationAPI({
    defaultPageSize
  });

  const query = useQuery({
    queryKey: [APIKeys.LANGUAGES_ADMIN, { ...variables }],
    queryFn: async () => {
      return await fetcher<Show_Core_LanguagesQuery, Show_Core_LanguagesQueryVariables>({
        query: Show_Core_Languages,
        variables
      });
    },
    placeholderData: previousData => previousData
  });

  return { ...query, defaultPageSize };
};
