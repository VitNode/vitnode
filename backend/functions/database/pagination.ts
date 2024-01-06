import { Operators, SQL, TableRelationalConfig } from 'drizzle-orm';

import { isUUID } from '../is-uuid';

import { PageInfo } from '@/types/database/pagination.type';
import { CustomError } from '@/utils/errors/CustomError';

type DataInterface<T> = T & {
  id: string;
};

interface OutputPaginationArgs<T> {
  cursor: string | undefined;
  edges: DataInterface<T>[];
  first: number | null;
  last: number | null;
  totalCount: {
    count: number;
  }[];
}

interface OutputPaginationReturn<T> {
  edges: DataInterface<T>[];
  pageInfo: PageInfo;
}

export function outputPagination<T>({
  cursor,
  edges,
  first,
  last,
  totalCount
}: OutputPaginationArgs<T>): OutputPaginationReturn<T> {
  let currentEdges: DataInterface<T>[] = edges;

  if (cursor) {
    currentEdges = first ? edges.slice(0, first) : edges.slice(-last);
  }

  const edgesCursor = {
    start: currentEdges.at(0)?.id ?? '',
    end: currentEdges.at(-1)?.id ?? ''
  };

  if (!isUUID(cursor)) {
    return {
      edges: [],
      pageInfo: {
        totalCount: 0,
        count: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
        endCursor: ''
      }
    };
  }

  if (!first && !last) {
    return {
      edges,
      pageInfo: {
        totalCount: totalCount[0].count,
        count: edges.length,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: edgesCursor.start,
        endCursor: edgesCursor.end
      }
    };
  }

  return {
    edges: currentEdges,
    pageInfo: {
      hasNextPage: cursor ? !!edges.at(first) : currentEdges.length === first,
      startCursor: edgesCursor.start,
      endCursor: edgesCursor.end,
      totalCount: totalCount[0].count,
      count: currentEdges.length,
      hasPreviousPage:
        last && cursor
          ? !!edges.at(0) && edges.length > last
          : edgesCursor.start !== undefined && !!cursor
    }
  };
}

// Input
interface InputPaginationArgs {
  cursor: string | undefined;
  first: number | null;
  last: number | null;
  where?: SQL;
}

interface InputPaginationReturn<T extends TableRelationalConfig> {
  limit: number;
  where?: (table: T['columns'], operators: Operators) => SQL | SQL;
}

export function inputPagination<T extends TableRelationalConfig>({
  cursor,
  first,
  last,
  where
}: InputPaginationArgs): InputPaginationReturn<T> {
  if (!first && !last) {
    return {
      limit: 0
    };
  }

  if (!cursor) {
    if (!first) {
      throw new CustomError({
        code: 'PAGINATION_ERROR',
        message: 'You must provide first argument when cursor is not provided'
      });
    }

    return {
      limit: first || last,
      where: () => where
    };
  }

  return {
    limit: (last || first) + 1,
    where: (table, { and, gt, lt }) => {
      if (!isUUID(cursor)) {
        return where;
      }

      const whereCursor = last ? lt(table.id, cursor) : gt(table.id, cursor);

      return where ? and(whereCursor, where) : whereCursor;
    }
  };
}
