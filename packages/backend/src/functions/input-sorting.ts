import { SortDirectionEnum } from '../utils';

interface Args<T> {
  defaultSortBy?: {
    column: T;
    direction: SortDirectionEnum;
  };

  sortBy:
    | {
        column: string;
        direction: SortDirectionEnum;
      }[]
    | undefined;
}

export function inputSorting<T>({
  defaultSortBy,
  sortBy,
}: Args<T>): Record<string, SortDirectionEnum>[] {
  const sortById = {
    id: SortDirectionEnum.desc,
  };

  if (!sortBy || sortBy.length === 0) {
    return [
      {
        [`${defaultSortBy?.column}`]:
          defaultSortBy?.direction ?? SortDirectionEnum.asc,
      },
      sortById,
    ];
  }

  return [
    ...sortBy.map(item => ({
      [item.column]: item.direction,
    })),
    sortById,
  ];
}
