import { core_terms } from '@/database/schema/terms';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';
import { and, count, eq, or } from 'drizzle-orm';

import { ShowCoreTermsArgs, ShowCoreTermsObj } from './show.dto';

@Injectable()
export class ShowCoreTermsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    last,
    code,
  }: ShowCoreTermsArgs): Promise<ShowCoreTermsObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_terms,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_terms.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
    });

    const where = code ? eq(core_terms.code, code) : undefined;
    const edgesFromDb = await this.databaseService.db.query.core_terms.findMany(
      {
        ...pagination,
        where: and(pagination.where, where),
      },
    );

    const edges = await Promise.all(
      edgesFromDb.map(async edge => {
        const title =
          await this.databaseService.db.query.core_languages_words.findMany({
            where: (table, { and, eq }) =>
              and(
                eq(table.item_id, edge.id),
                or(eq(table.variable, 'title'), eq(table.variable, 'content')),
              ),
          });

        return {
          ...edge,
          title: title.filter(value => value.variable === 'title'),
          content: title.filter(value => value.variable === 'content'),
        };
      }),
    );

    // const edges = await this.databaseService.db
    //   .select()
    //   .from(core_terms)
    //   .limit(pagination.limit ?? 0)
    //   .orderBy(pagination.orderBy)
    //   .where(and(pagination.where, where))
    //   .leftJoin(
    //     core_languages_words,
    //     and(
    //       eq(core_terms.id, core_languages_words.item_id),
    //       eq(core_languages_words.variable, 'title'),
    //     ),
    //   );

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_terms)
      .where(where);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
