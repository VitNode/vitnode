import { useSearchParams } from 'next/navigation';

import { SortDirectionEnum } from '@/graphql/hooks';

export const useGetSortByParamsAPI = (): {
  column: string;
  direction: SortDirectionEnum;
} | null => {
  const searchParams = useSearchParams();

  if (!searchParams.get('sortBy') || !searchParams.get('sortDirection')) {
    return null;
  }

  return {
    column: searchParams.get('sortBy') ?? '',
    direction:
      searchParams.get('sortDirection') === 'asc' ? SortDirectionEnum.Asc : SortDirectionEnum.Desc
  };
};
