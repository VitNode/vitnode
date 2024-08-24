import { core_plugins } from '@/database/schema/plugins';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { SortDirectionEnum } from '@/utils';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { and, count, eq, ilike } from 'drizzle-orm';

import { ShowAdminPluginsArgs } from './dto/show.args';
import { ShowAdminPluginsObj } from './dto/show.obj';

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
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_plugins,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_plugins.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
    });

    const where = code
      ? eq(core_plugins.code, code)
      : ilike(core_plugins.name, `%${search}%`);

    const edges = await this.databaseService.db.query.core_plugins.findMany({
      ...pagination,
      where: and(pagination.where, where),
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_plugins)
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
