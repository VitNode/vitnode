import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { core_nav } from '../../../database/schema/nav';
import { SortDirectionEnum } from '../../../utils';
import { ShowCoreNavArgs, ShowCoreNavObj } from './show.dto';

@Injectable()
export class ShowCoreNavService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async show({
    cursor,
    first,
    last,
  }: ShowCoreNavArgs): Promise<ShowCoreNavObj> {
    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_nav,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position',
      },
      where: eq(core_nav.parent_id, 0),
      query: async args =>
        await this.databaseService.db.query.core_nav.findMany(args),
    });

    const ids = pagination.edges.map(item => item.id);
    const i18n = await this.stringLanguageHelper.get({
      item_ids: ids,
      database: core_nav,
      plugin_code: 'core',
      variables: ['name', 'description'],
    });

    const edges: ShowCoreNavObj['edges'] = await Promise.all(
      pagination.edges.map(async item => {
        const children = await this.databaseService.db.query.core_nav.findMany({
          where: (table, { eq }) => eq(table.parent_id, item.id),
          orderBy: (table, { asc }) => asc(table.position),
        });
        const ids = children.map(child => child.id);
        const childrenI18n = await this.stringLanguageHelper.get({
          item_ids: ids,
          database: core_nav,
          plugin_code: 'core',
          variables: ['name', 'description'],
        });

        return {
          ...item,
          name: i18n.filter(
            i => i.item_id === item.id && i.variable === 'name',
          ),
          description: i18n.filter(
            i => i.item_id === item.id && i.variable === 'description',
          ),
          children: children.map(child => ({
            ...child,
            name: childrenI18n.filter(
              i => i.item_id === child.id && i.variable === 'name',
            ),
            description: childrenI18n.filter(
              i => i.item_id === child.id && i.variable === 'description',
            ),
          })),
        };
      }),
    );

    return { ...pagination, edges };
  }
}
