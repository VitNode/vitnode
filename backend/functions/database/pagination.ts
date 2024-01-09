import {
  AnyColumn,
  Operators,
  SQL,
  SQLWrapper,
  TableRelationalConfig,
  and,
  asc,
  desc,
  eq,
  gt,
  lt,
  lte,
  or
} from 'drizzle-orm';
import { PgColumn, PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

import { PageInfo } from '@/types/database/pagination.type';
import { CustomError } from '@/utils/errors/CustomError';
import { DatabaseService } from '@/database/database.service';

type DataInterface<T> = T & {
  id: number;
};

interface OutputPaginationArgs<T> {
  cursor: number | null;
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
    start: currentEdges.at(0)?.id,
    end: currentEdges.at(-1)?.id
  };

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

// Input Pagination Cursor
export type Cursor = { order?: 'ASC' | 'DESC'; key: string; schema: AnyColumn };

interface InputPaginationCursorArgs<T extends TableConfig> {
  cursor: number | null;
  database: PgTableWithColumns<T>;
  databaseService: DatabaseService;
  first: number | null;
  last: number | null;
  primaryCursor: Cursor;
  cursors?: Cursor[];
}

interface Return {
  orderBy: SQL<unknown>[];
  where: SQL<unknown>;
  limit: number;
}

function parse<T extends Record<string, unknown> = Record<string, unknown>>(
  {
    primaryCursor,
    cursors = []
  }: {
    primaryCursor: Cursor;
    cursors?: Cursor[];
  },
  cursor?: string | null
): T | null {
  if (!cursor) {
    return null;
  }

  const keys = [primaryCursor, ...cursors].map(cursor => cursor.key);
  const data = JSON.parse(atob(cursor)) as T;

  const item = keys.reduce(
    (acc, key) => {
      const value = data[key];
      acc[key] = value;

      return acc;
    },
    {} as Record<string, unknown>
  );

  return item as T;
}

function generateSubArrays<T>(arr: ReadonlyArray<T>): T[][] {
  const subArrays: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    subArrays.push([...arr.slice(0, i + 1)]);
  }

  return subArrays;
}

export async function inputPaginationCursor<T extends TableConfig>({
  cursor: cursorId,
  database,
  databaseService,
  first,
  last,
  cursors = [],
  primaryCursor
}: InputPaginationCursorArgs<T>): Promise<Return> {
  const orderBy: SQL[] = [];
  for (const { order = 'ASC', schema } of [...cursors, primaryCursor]) {
    const fn = order === 'ASC' ? asc : desc;
    const sql = fn(schema);
    orderBy.push(sql);
  }

  if (!cursorId) {
    return {
      where: undefined,
      orderBy,
      limit: (first || last) ?? 0
    };
  }

  if (!database[primaryCursor.key]) {
    throw new CustomError({
      code: 'PAGINATION_ERROR',
      message: `You must provide \`${primaryCursor.key}\` column in database`
    });
  }

  const cursorData = await databaseService.db
    .select()
    .from(database)
    .where(eq(database.id, cursorId))
    .limit(1);

  const cursorItem = cursorData[0];

  if (!cursorItem) {
    throw new CustomError({
      code: 'PAGINATION_ERROR',
      message: `Cursor item not found`
    });
  }

  const where = (cursorItem?: Record<string, unknown> | string | null) => {
    const data =
      typeof cursorItem === 'string' ? parse({ primaryCursor, cursors }, cursorItem) : cursorItem;

    if (!data) {
      return undefined;
    }

    const matrix = generateSubArrays([...cursors, primaryCursor]);

    const ors: SQL[] = [];
    for (const posibilities of matrix) {
      const ands: SQL[] = [];
      for (const cursor of posibilities) {
        const lastValue = cursor === posibilities?.at(-1);
        const { order = 'ASC', schema, key } = cursor;
        const fn = order === 'ASC' ? gt : lt;
        const sql = !lastValue ? eq(schema, data[key]) : fn(schema, data[key]);
        ands.push(sql);
      }
      const _and = and(...ands);
      if (!_and) {
        continue;
      }
      ors.push(_and);
    }
    const where = or(...ors);

    return where;
  };

  return {
    where: where(cursorItem),
    orderBy,
    limit: first || last ? (first || last) + 1 : 0
  };
}
