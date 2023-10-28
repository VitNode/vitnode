import { PageInfo } from '@/types/database/pagination.type';
import { CustomError } from '@/utils/errors/CustomError';

type DataInterface<T> = T & {
  id: string | number;
};

interface Args<T> {
  cursor: string | number | undefined;
  edges: DataInterface<T>[];
  first: number | undefined;
  last: number | undefined;
  totalCount: number;
}

interface Return<T> {
  edges: DataInterface<T>[];
  pageInfo: PageInfo;
}

export function outputPagination<T>({
  cursor,
  edges,
  first,
  last,
  totalCount
}: Args<T>): Return<T> {
  if (!first && !last) {
    throw new CustomError({
      code: 'PAGINATION_ERROR',
      message: 'You must provide either first or last argument'
    });
  }

  let currentEdges: DataInterface<T>[] = edges;

  if (cursor) {
    currentEdges = first ? edges.slice(0, first) : edges.slice(-last);
  }

  const edgesCursor = {
    start: currentEdges.at(0)?.id,
    end: currentEdges.at(-1)?.id
  };

  return {
    pageInfo: {
      hasNextPage: cursor ? !!edges.at(first) : currentEdges.length === first,
      startCursor: edgesCursor.start ? `${edgesCursor.start}` : '',
      endCursor: edgesCursor.end ? `${edgesCursor.end}` : '',
      totalCount,
      count: currentEdges.length,
      hasPreviousPage:
        last && cursor
          ? !!edges.at(0) && edges.length > last
          : edgesCursor.start !== undefined && !!cursor
    },
    edges: currentEdges
  };
}
