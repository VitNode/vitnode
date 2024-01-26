import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowAdminThemesObj } from './dto/show.obj';
import { ShowAdminThemesArgs } from './dto/show.args';

import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { core_themes } from '../../database/schema/themes';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last, sortBy }: ShowAdminThemesArgs): Promise<ShowAdminThemesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_themes,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_themes.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'created'
      },
      sortBy
    });

    const edges = await this.databaseService.db.query.core_themes.findMany({
      ...pagination
    });

    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_themes);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
