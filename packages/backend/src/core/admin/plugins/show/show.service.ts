import { core_plugins } from '@/database/schema/plugins';
import { SortDirectionEnum } from '@/utils';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq, ilike } from 'drizzle-orm';

import { ShowAdminPluginsArgs, ShowAdminPluginsObj } from './show.dto';

@Injectable()
export class ShowAdminPluginsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    code,
    cursor,
    first,
    last,
    search = '',
    sortBy,
  }: ShowAdminPluginsArgs): Promise<ShowAdminPluginsObj> {
    const where = code
      ? eq(core_plugins.code, code)
      : ilike(core_plugins.name, `%${search}%`);

    return await this.databaseService.paginationCursor({
      cursor,
      database: core_plugins,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
      where,
      query: async args =>
        await this.databaseService.db.query.core_plugins.findMany(args),
    });
  }
}
