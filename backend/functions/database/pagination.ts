import { Operators, SQL, TableRelationalConfig, and, eq, lte } from 'drizzle-orm';

import { isUUID } from '../is-uuid';

import { PageInfo } from '@/types/database/pagination.type';
import { CustomError } from '@/utils/errors/CustomError';
import { DatabaseService } from '@/database/database.service';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

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

  if (cursor && !isUUID(cursor)) {
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

interface InputPaginationCursorArgs<T extends TableConfig> {
  databaseService: DatabaseService;
  cursor: string | null;
  database: PgTableWithColumns<T>;
  first: number | null;
  last?: number | null;
}

export async function inputPaginationCursor<T extends TableConfig>({
  databaseService,
  database,
  cursor: cursorId,
  first,
  last
}: InputPaginationCursorArgs<T>) {
  // Check if database has `created` and `id` columns
  if (!database['created'] || !database['id']) {
    throw new CustomError({
      code: 'PAGINATION_ERROR',
      message: 'You must provide `created` and `id` columns in database'
    });
  }

  const cursor = await databaseService.db
    .select()
    .from(database)
    .where(eq(database.id, cursorId))
    .limit(1);

  if (cursor.length === 0) {
    return {
      limit: first || last,
      where: undefined
    };
  }

  return {
    limit: (last || first) + 1,
    where: and(lte(database['created'], cursor[0]['created']), eq(database['id'], cursorId))
  };
}
