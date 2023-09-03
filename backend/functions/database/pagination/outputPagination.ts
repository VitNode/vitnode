import { PageInfo } from '@/types/database/pagination.type';

type DataInterface<T> = T & {
  id: string;
};

interface Args<T> {
  cursor: string | undefined;
  edges: DataInterface<T>[];
  first: number;
  totalCount: number;
}

interface Return<T> {
  edges: DataInterface<T>[];
  pageInfo: PageInfo;
}

export function outputPagination<T>({ edges, first, totalCount }: Args<T>): Return<T> {
  return {
    pageInfo: {
      hasNextPage: edges.length === first,
      startCursor: edges.at(0)?.id ?? '',
      endCursor: edges.at(-1)?.id ?? '',
      totalCount,
      count: edges.length
    },
    edges
  };
}
