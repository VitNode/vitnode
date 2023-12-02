import { SortDirectionEnum } from '@/types/database/sortDirection.type';

interface Args<T> {
  sortBy:
    | {
        column: string;
        direction: SortDirectionEnum;
      }[]
    | undefined;

  defaultSortBy?: {
    column: T;
    direction: SortDirectionEnum;
  };
}

export function inputSorting<T>({
  defaultSortBy,
  sortBy
}: Args<T>): Record<string, SortDirectionEnum>[] {
  const sortById = {
    id: SortDirectionEnum.desc
  };

  if (!sortBy || sortBy.length <= 0) {
    return [
      {
        [`${defaultSortBy?.column}`]: defaultSortBy?.direction
      },
      sortById
    ];
  }

  return [
    ...sortBy.map(item => ({
      [`${item.column}`]: item.direction
    })),
    sortById
  ];
}
