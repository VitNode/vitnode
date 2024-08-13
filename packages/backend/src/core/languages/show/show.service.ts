import { Injectable } from '@nestjs/common';
import { and, count, ilike } from 'drizzle-orm';

import { ShowCoreLanguagesArgs } from './dto/show.args';
import { ShowCoreLanguagesObj } from './dto/show.obj';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { inputPaginationCursor, outputPagination } from '../../../functions';
import { core_languages } from '../../../database/schema/languages';
import { SortDirectionEnum } from '../../../utils';

@Injectable()
export class ShowCoreLanguageService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search = '',
    sortBy,
  }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_languages,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_languages.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'created',
      },
      sortBy,
    });

    const where = ilike(core_languages.name, `%${search}%`);
    const edges = await this.databaseService.db.query.core_languages.findMany({
      ...pagination,
      where: and(pagination.where, where),
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages)
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
