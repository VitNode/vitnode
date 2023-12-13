import { PageInfo } from '@/types/database/pagination.type';

type DataInterface<T> = T & {
  id: string;
};

interface Args<T> {
  cursor: string | undefined;
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
  let currentEdges: DataInterface<T>[] = edges;

  if (cursor) {
    currentEdges = first ? edges.slice(0, first) : edges.slice(-last);
  }

  const edgesCursor = {
    start: currentEdges.at(0)?.id ?? '',
    end: currentEdges.at(-1)?.id ?? ''
  };

  if (!first && !last) {
    return {
      edges,
      pageInfo: {
        totalCount,
        count: edges.length,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: edgesCursor.start,
        endCursor: edgesCursor.end
      }
    };
  }

  return {
    pageInfo: {
      hasNextPage: cursor ? !!edges.at(first) : currentEdges.length === first,
      startCursor: edgesCursor.start,
      endCursor: edgesCursor.end,
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
