import { AnyColumn, SQL, asc, desc, eq, gt, gte, lt, lte } from "drizzle-orm";
import { PgTableWithColumns, TableConfig } from "drizzle-orm/pg-core";

import { DatabaseService } from "@/database/database.service";
import { PageInfo } from "@/utils/types/database/pagination.type";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";

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

  if (last) {
    currentEdges = currentEdges.reverse();
  }

  currentEdges = last
    ? edges.slice(-last - 1).slice(0, last)
    : edges.slice(0, first);

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
      hasNextPage: cursor
        ? !!edges.at(first)
        : edges.length > currentEdges.length,
      startCursor: edgesCursor.start,
      endCursor: edgesCursor.end,
      totalCount: totalCount[0].count,
      count: currentEdges.length,
      hasPreviousPage:
        last && cursor
          ? edges.length > currentEdges.length + 1
          : edgesCursor.start !== undefined && !!cursor
    }
  };
}

// Input Pagination Cursor
export interface Cursor {
  column: string;
  schema: AnyColumn;
}

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
  };
}

interface Return {
  limit: number;
  orderBy: SQL<unknown>;
  where: SQL<unknown>;
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
  const currentSortBy: {
    column: string;
    direction: SortDirectionEnum;
  } = sortBy ? sortBy : defaultSortBy;

  const fn = last
    ? currentSortBy.direction === SortDirectionEnum.asc
      ? desc
      : asc
    : currentSortBy.direction === SortDirectionEnum.asc
      ? asc
      : desc;
  const orderBy: SQL = fn(database[currentSortBy.column]);

  let where: SQL<unknown> | undefined;
  if (cursorId) {
    const cursorData = await databaseService.db
      .select()
      .from(database)
      .where(eq(database.id, cursorId))
      .limit(1);

    const cursorItem = cursorData[0];

    if (!cursorItem) {
      return {
        where: eq(database.id, -1),
        orderBy,
        limit: 0
      };
    }

    const { column, schema } = primaryCursor;
    const fn = last
      ? currentSortBy.direction === SortDirectionEnum.asc
        ? lte
        : gte
      : currentSortBy.direction === SortDirectionEnum.asc
        ? gt
        : lt;
    where = fn(schema, cursorItem[column]);
  }

  return {
    where,
    orderBy,
    limit: first || last ? (last ? last + 1 : first) + 1 : 0
  };
}
