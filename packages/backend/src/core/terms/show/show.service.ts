import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_terms } from '@/database/schema/terms';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

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
    const where = code ? eq(core_terms.code, code) : undefined;
    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_terms,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      where,
      query: async args =>
        await this.databaseService.db.query.core_terms.findMany(args),
    });

    const ids = pagination.edges.map(edge => edge.id);
    const i18n = await this.stringLanguageHelper.get({
      item_ids: ids,
      database: core_terms,
      plugin_code: 'core',
      variables: ['title', 'content'],
    });

    const edges = pagination.edges.map(edge => {
      const currentI18n = i18n.filter(item => item.item_id === edge.id);

      return {
        ...edge,
        title: currentI18n.filter(value => value.variable === 'title'),
        content: currentI18n.filter(value => value.variable === 'content'),
      };
    });

    return { ...pagination, edges };
  }
}
