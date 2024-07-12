import { SortDirectionEnum } from './graphql';

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

interface ReturnValues<T> {
  cursor: number | null;
  first: number;
  last: number;
  search: string;
  sortBy: { column: keyof T; direction: SortDirectionEnum } | null;
}

export function getPaginationTool<T extends Record<string, unknown>>({
  defaultPageSize,
  search,
  searchParams,
  sortByEnum,
}: Args<T>): ReturnValues<T> {
  const pagination = {
    first: Number(searchParams.last ?? 0)
      ? null
      : Number(searchParams.first ?? 0),
    last: Number(searchParams.last ?? 0),
    cursor: Number(searchParams.cursor) ?? null,
    search: search ? searchParams.search ?? '' : '',
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
}): {
  column: keyof T;
  direction: SortDirectionEnum;
} | null {
  const sort = {
    by: searchParams.sortBy?.toLowerCase(),
    direction: searchParams.sortDirection?.toLowerCase(),
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
