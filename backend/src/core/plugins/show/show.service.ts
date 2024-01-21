import { Injectable } from '@nestjs/common';
import { and, count, ne } from 'drizzle-orm';

import { ShowCorePluginsObj } from './dto/show.obj';
import { ShowCorePluginsArgs } from './dto/show.args';

import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { core_plugins } from '@/src/admin/core/database/schema/plugins';

@Injectable()
export class ShowCorePluginsService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last }: ShowCorePluginsArgs): Promise<ShowCorePluginsObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_plugins,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_plugins.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position'
      }
    });

    const edges = await this.databaseService.db.query.core_plugins.findMany({
      ...pagination,
      where: and(pagination.where, ne(core_plugins.code, 'core'))
    });

    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_plugins);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
