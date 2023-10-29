import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { APIKeys } from '@/graphql/api-keys';
import { fetcher } from '@/graphql/fetcher';
import {
  Show_Core_Languages,
  Show_Core_LanguagesQuery,
  Show_Core_LanguagesQueryVariables
} from '@/graphql/hooks';

export const useLangsAdminAPI = () => {
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor')
  };

  return useQuery({
    queryKey: [APIKeys.LANGUAGES_ADMIN, { ...pagination }],
    queryFn: async () => {
      const defaultFirst = !pagination.last ? 10 : null;

      return await fetcher<Show_Core_LanguagesQuery, Show_Core_LanguagesQueryVariables>({
        query: Show_Core_Languages,
        variables: {
          first: pagination.first ? +pagination.first : defaultFirst,
          last: pagination.last ? +pagination.last : null,
          cursor: pagination.cursor ?? null
        }
      });
    },
    placeholderData: previousData => previousData
  });
};
