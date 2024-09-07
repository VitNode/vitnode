import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_terms } from '@/database/schema/terms';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

import { ShowCoreTermsArgs, ShowCoreTermsObj } from './show.dto';

@Injectable()
export class ShowCoreTermsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

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
    const ids = edgesFromDb.map(edge => edge.id);
    const i18n = await this.stringLanguageHelper.get({
      item_ids: ids,
      database: core_terms,
      plugin_code: 'core',
      variables: ['title', 'content'],
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_terms)
      .where(where);

    return outputPagination({
      edges: edgesFromDb.map(edge => {
        const currentI18n = i18n.filter(item => item.item_id === edge.id);

        return {
          ...edge,
          title: currentI18n.filter(value => value.variable === 'title'),
          content: currentI18n.filter(value => value.variable === 'content'),
        };
      }),
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
