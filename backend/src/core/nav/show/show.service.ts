import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowCoreNavArgs } from './dto/show.args';
import { ShowCoreNavObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { core_nav } from '@/src/admin/core/database/schema/nav';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowCoreNavService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last }: ShowCoreNavArgs): Promise<ShowCoreNavObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_nav,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_nav.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position'
      }
    });

    const edges = await this.databaseService.db.query.core_nav.findMany({
      ...pagination,
      with: {
        name: true,
        description: true
      }
    });

    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_nav);

    return outputPagination({
      edges: edges.map(edge => {
        return { ...edge, children: [] };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
