import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

import { ShowCoreNavArgs } from './dto/show.args';
import { ShowCoreNavObj } from './dto/show.obj';

import { DatabaseService } from '../../../database';
import { inputPaginationCursor, outputPagination } from '../../../functions';
import { core_nav } from '../../../templates/core/admin/database/schema/nav';
import { SortDirectionEnum } from '../../../utils';

@Injectable()
export class ShowCoreNavService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
  }: ShowCoreNavArgs): Promise<ShowCoreNavObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_nav,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_nav.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position',
      },
    });

    const itemsParent = await this.databaseService.db.query.core_nav.findMany({
      ...pagination,
      where: and(pagination.where, eq(core_nav.parent_id, 0)),
      with: {
        name: true,
        description: true,
      },
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_nav);

    const edges = await Promise.all(
      itemsParent.map(async item => {
        const children = await this.databaseService.db.query.core_nav.findMany({
          where: (table, { eq }) => eq(table.parent_id, item.id),
          orderBy: (table, { asc }) => asc(table.position),
          with: {
            name: true,
            description: true,
          },
        });

        return {
          ...item,
          children,
        };
      }),
    );

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
