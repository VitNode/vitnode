import { PageInfo } from '@/types/database/pagination.type';

type DataInterface<T> = T & {
  id: string | number;
};

interface Args<T> {
  cursor: string | number | undefined;
  edges: DataInterface<T>[];
  first: number;
  totalCount: number;
}

interface Return<T> {
  edges: DataInterface<T>[];
  pageInfo: PageInfo;
}

export function outputPagination<T>({ edges, first, totalCount }: Args<T>): Return<T> {
  const cursor = {
    start: edges.at(0)?.id,
    end: edges.at(-1)?.id
  };

  return {
    pageInfo: {
      hasNextPage: edges.length === first,
      startCursor: cursor.start ? `${cursor.start}` : '',
      endCursor: cursor.end ? `${cursor.end}` : '',
      totalCount,
      count: edges.length
    },
    edges
  };
}
