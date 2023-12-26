import { SortDirectionEnum } from '@/graphql/hooks';

export interface SearchParamsPagination {
  cursor?: string;
  first?: string;
  last?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: string;
}

interface Args<T> {
  defaultPageSize: 10 | 20 | 30 | 40 | 50;
  searchParams: SearchParamsPagination;
  search?: boolean;
  sortByEnum?: T;
}

export function usePaginationAPISsr<T extends { [key: string]: unknown }>({
  defaultPageSize,
  search,
  searchParams,
  sortByEnum
}: Args<T>) {
  const pagination = {
    first: Number(searchParams.first ?? 0),
    last: Number(searchParams.last ?? 0),
    cursor: searchParams.cursor ?? null,
    search: search ? searchParams.search ?? '' : '',
    sortBy: useGetSortByParamsAPI({ constEnum: sortByEnum, searchParams })
  };
  const defaultFirst = !pagination.last ? defaultPageSize : null;

  return {
    ...pagination,
    first: pagination.first ? pagination.first : defaultFirst
  };
}

function useGetSortByParamsAPI<T extends { [key: string]: unknown }>({
  constEnum,
  searchParams
}: {
  searchParams: Pick<SearchParamsPagination, 'sortBy' | 'sortDirection'>;
  constEnum?: T;
}): {
  column: keyof T;
  direction: SortDirectionEnum;
} | null {
  const sort = {
    by: searchParams.sortBy?.toLowerCase(),
    direction: searchParams.sortDirection?.toLowerCase()
  };

  if (
    !constEnum ||
    !sort.by ||
    !sort.direction ||
    !(sort.by in constEnum) ||
    !(sort.direction in SortDirectionEnum)
  ) {
    return null;
  }

  return {
    column: sort.by as keyof T,
    direction: sort.direction === 'asc' ? SortDirectionEnum.asc : SortDirectionEnum.desc
  };
}

export const emptyPagination = ({ first }: { first: 10 | 20 | 30 | 40 | 50 }) => {
  return {
    first,
    last: 0,
    cursor: null,
    search: '',
    sortBy: null
  };
};
