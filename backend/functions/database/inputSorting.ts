import { Prisma } from '@prisma/client';

interface Args<T> {
  sortBy:
    | {
        column: T;
        direction: Prisma.SortOrder;
      }[]
    | undefined;

  defaultSortBy?: {
    column: T;
    direction: Prisma.SortOrder;
  };
}

export function inputSorting<T>({ sortBy, defaultSortBy }: Args<T>) {
  if (sortBy.length <= 0)
    return {
      [`${defaultSortBy?.column}`]: defaultSortBy?.direction
    };

  return sortBy
    .map(item => ({
      [`${item.column}`]: item.direction
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }));
}
