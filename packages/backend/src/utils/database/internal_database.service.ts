import { DatabaseModuleArgs } from '@/utils/database/database.module';
import { Inject, Injectable } from '@nestjs/common';
import { and, asc, count, desc, gt, gte, lt, lte, SQL } from 'drizzle-orm';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

import coreSchemaDatabase from '../../database';
import { PageInfo, SortDirectionEnum } from '../pagination';
import { createClientDatabase, DetermineClient } from './client';

@Injectable()
export class InternalDatabaseService<
  T extends Record<string, unknown> = typeof coreSchemaDatabase,
> {
  constructor(
    @Inject('DATABASE_MODULE_OPTIONS')
    private readonly options: DatabaseModuleArgs,
  ) {
    void (async () => {
      const client = await createClientDatabase({
        schemaDatabase: this.options.schemaDatabase,
        config: this.options.config,
      });

      this.db = client.db as DetermineClient<T>;
    })();
  }

  public db: DetermineClient<T>;

  protected outputPagination<T>({
    edges,
    totalCount,
    cursor,
    last,
    first,
    primaryCursor,
  }: {
    cursor: number | undefined;
    edges: T[];
    first: number | undefined;
    last: number | undefined;
    primaryCursor: string;
    totalCount: number;
  }): {
    edges: T[];
    pageInfo: PageInfo;
  } {
    let currentEdges: T[] = edges;

    if (last) {
      currentEdges = currentEdges.reverse();
    }

    currentEdges = last
      ? edges.slice(-last - 1).slice(0, last)
      : edges.slice(0, first);

    const edgesCursor: {
      end: number | undefined;
      start: number | undefined;
    } = {
      start: currentEdges.at(0)?.[primaryCursor],
      end: currentEdges.at(-1)?.[primaryCursor],
    };

    if (!first && !last) {
      return {
        edges,
        pageInfo: {
          totalCount,
          count: edges.length,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: edgesCursor.start ?? null,
          endCursor: edgesCursor.end ?? null,
        },
      };
    }

    return {
      edges: currentEdges,
      pageInfo: {
        hasNextPage:
          cursor && first
            ? !!edges.at(first)
            : edges.length > currentEdges.length,
        startCursor: edgesCursor.start ?? null,
        endCursor: edgesCursor.end ?? null,
        totalCount,
        count: currentEdges.length,
        hasPreviousPage:
          last && cursor
            ? edges.length > currentEdges.length + 1
            : edgesCursor.start !== undefined && !!cursor,
      },
    };
  }

  async paginationCursor<T extends TableConfig, Y>({
    cursor: cursorId,
    database,
    defaultSortBy,
    first,
    last,
    primaryCursor,
    sortBy,
    where: whereInput,
    query,
  }: {
    cursor: number | undefined;
    database: PgTableWithColumns<T>;
    defaultSortBy: {
      column: keyof T['columns'];
      direction: SortDirectionEnum;
    };
    first: number | undefined;
    last: number | undefined;
    primaryCursor: keyof T['columns'];
    query: (args: {
      limit?: number;
      orderBy: SQL;
      where?: SQL;
    }) => Promise<Y[]>;
    sortBy?: {
      column: string;
      direction: SortDirectionEnum;
    };
    where?: SQL;
  }) {
    const currentSortBy: {
      column: keyof T['columns'];
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

    let where: SQL | undefined;
    if (cursorId) {
      const comparisonFn = last
        ? currentSortBy.direction === SortDirectionEnum.asc
          ? lte
          : gte
        : currentSortBy.direction === SortDirectionEnum.asc
          ? gt
          : lt;
      where = comparisonFn(database[primaryCursor], cursorId);

      // ! Deleted fragment code. If you having trouble, please uncomment below code.
      // const cursorData = await this.db
      //   .select()
      //   .from(database)
      //   .where(eq(database[primaryCursor], cursorId))
      //   .limit(1);

      // if (cursorData.length === 1) {
      //   const comparisonFn = last
      //     ? currentSortBy.direction === SortDirectionEnum.asc
      //       ? lte
      //       : gte
      //     : currentSortBy.direction === SortDirectionEnum.asc
      //       ? gt
      //       : lt;
      //   where = comparisonFn(
      //     database[primaryCursor],
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      //     cursorData[0][primaryCursor as string],
      //   );
      // }
    }

    const [edges, [totalCount]] = await Promise.all([
      query({
        where: whereInput ? and(whereInput, where) : where,
        orderBy,
        limit: first || last ? ((last ? last + 1 : first) ?? 0) + 1 : undefined,
      }),
      this.db.select({ count: count() }).from(database).where(where),
    ]);

    return this.outputPagination({
      edges,
      cursor: cursorId,
      last,
      first,
      primaryCursor: primaryCursor.toString(),
      totalCount: totalCount.count,
    });
  }
}
