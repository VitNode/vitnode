import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { ilike } from 'drizzle-orm';

import { core_languages } from '../../../database/schema/languages';
import { SortDirectionEnum } from '../../../utils';
import { ShowCoreLanguagesArgs, ShowCoreLanguagesObj } from './show.dto';

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
    const where = ilike(core_languages.name, `%${search}%`);

    return await this.databaseService.paginationCursor({
      cursor,
      database: core_languages,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'created',
      },
      sortBy,
      where,
      query: async args =>
        this.databaseService.db.query.core_languages.findMany(args),
    });
  }
}
