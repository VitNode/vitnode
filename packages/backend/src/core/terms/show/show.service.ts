import { core_terms } from '@/database/schema/terms';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

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
    const edges = await this.databaseService.db.query.core_terms.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        title: true,
        content: true,
      },
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_terms)
      .where(where);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
