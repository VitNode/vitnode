import { AnyColumn, SQL, and, asc, desc, eq, gt, lt, or } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

import { PageInfo } from "@/types/database/pagination.type";
import { CustomError } from "@/utils/errors/CustomError";
import { DatabaseService } from "@/modules/database/database.service";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

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

  if (last) {
    currentEdges = currentEdges.reverse();
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
export type Cursor = { key: string; schema: AnyColumn; order?: "ASC" | "DESC" };

interface InputPaginationCursorArgs<T extends TableConfig> {
  cursor: number | null;
  database: PgTableWithColumns<T>;
  databaseService: DatabaseService;
  defaultSortBy: {
    column: string;
    direction: SortDirectionEnum;
  };
  first: number | null;
  last: number | null;
  primaryCursor: Cursor;
  sortBy?: {
    column: string;
    direction: SortDirectionEnum;
  }[];
}

interface Return {
  limit: number;
  orderBy: SQL<unknown>[];
  where: SQL<unknown>;
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
  defaultSortBy,
  first,
  last,
  primaryCursor,
  sortBy
}: InputPaginationCursorArgs<T>): Promise<Return> {
  const cursors: Cursor[] = [...(sortBy ?? []), defaultSortBy].map(item => ({
    key: item.column,
    order: item.direction === "asc" ? "ASC" : "DESC",
    schema: database[item.column]
  }));

  const orderBy: SQL[] = [];
  for (const { order = "ASC", schema } of [...cursors, primaryCursor]) {
    const fn = last
      ? order === "ASC"
        ? desc
        : asc
      : order === "ASC"
        ? asc
        : desc;
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
      code: "PAGINATION_ERROR",
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
      code: "PAGINATION_ERROR",
      message: `Cursor item not found`
    });
  }

  if (!cursorItem) {
    return undefined;
  }

  const matrix = generateSubArrays([...cursors, primaryCursor]);

  const ors: SQL[] = [];
  for (const posibilities of matrix) {
    const ands: SQL[] = [];
    for (const cursor of posibilities) {
      const lastValue = cursor === posibilities?.at(-1);
      const { key, order = "ASC", schema } = cursor;
      const fn = last ? (order === "ASC" ? lt : gt) : order === "ASC" ? gt : lt;
      const sql = !lastValue
        ? eq(schema, cursorItem[key])
        : fn(schema, cursorItem[key]);
      ands.push(sql);
    }
    const _and = and(...ands);
    if (!_and) {
      continue;
    }
    ors.push(_and);
  }
  const where = or(...ors);

  return {
    where,
    orderBy,
    limit: first || last ? (first || last) + 1 : 0
  };
}
