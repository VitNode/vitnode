import { SortDirectionEnum } from './types';

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
  searchParams: Promise<SearchParamsPagination>;
  search?: boolean;
  sortByEnum?: T;
}

interface ReturnValues<T> {
  first: number;
  last: number;
  cursor?: number;
  sortBy?: { column: keyof T; direction: SortDirectionEnum };
}

export async function getPaginationTool<T extends Record<string, unknown>>({
  defaultPageSize,
  searchParams: searchParamsPromise,
  sortByEnum,
}: Args<T>): Promise<ReturnValues<T>> {
  const searchParams = await searchParamsPromise;

  const pagination = {
    first: Number(searchParams?.last ?? 0)
      ? null
      : Number(searchParams?.first ?? 0),
    last: Number(searchParams?.last ?? 0),
    cursor: Number(searchParams?.cursor) || undefined,
    search: searchParams?.search ?? '',
    sortBy: getGetSortByParamsAPI({ constEnum: sortByEnum, searchParams }),
  };

  return {
    ...pagination,
    first: pagination.first ? pagination.first : defaultPageSize,
  };
}

function getGetSortByParamsAPI<T extends Record<string, unknown>>({
  constEnum,
  searchParams,
}: {
  searchParams: Pick<SearchParamsPagination, 'sortBy' | 'sortDirection'>;
  constEnum?: T;
}):
  | {
      column: keyof T;
      direction: SortDirectionEnum;
    }
  | undefined {
  const sort = {
    by: searchParams?.sortBy?.toLowerCase(),
    direction: searchParams?.sortDirection?.toLowerCase(),
  };

  if (
    !constEnum ||
    !sort.by ||
    !sort.direction ||
    !(sort.by in constEnum) ||
    !(sort.direction in SortDirectionEnum)
  ) {
    return;
  }

  return {
    column: sort.by as keyof T,
    direction:
      sort.direction === 'asc' ? SortDirectionEnum.asc : SortDirectionEnum.desc,
  };
}

export const emptyPagination = ({
  first,
}: {
  first: 10 | 20 | 30 | 40 | 50;
}) => {
  return {
    first,
    last: 0,
    cursor: null,
    search: '',
    sortBy: null,
  };
};
