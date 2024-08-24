import { useQuery } from '@tanstack/react-query';

import { queryApi } from './query-api';

export const useSearchAdminApi = (search: string) => {
  const query = useQuery({
    queryKey: ['admin__sessions__search', { search }],
    queryFn: async () => {
      const mutation = await queryApi({ search });

      return mutation.data;
    },
    enabled: search.length >= 3,
  });

  return query;
};
