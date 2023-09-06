import { SortDirectionEnum } from '@/types/database/sortDirection.type';

interface Args<T> {
  sortBy:
    | {
        column: T;
        direction: SortDirectionEnum;
      }[]
    | undefined;

  defaultSortBy?: {
    column: T;
    direction: SortDirectionEnum;
  };
}

export function inputSorting<T>({ defaultSortBy, sortBy }: Args<T>) {
  if (!sortBy || sortBy.length <= 0)
    return {
      [`${defaultSortBy?.column}`]: defaultSortBy?.direction
    };

  return sortBy
    .map(item => ({
      [`${item.column}`]: item.direction
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }));
}
