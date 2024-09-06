import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { ShowCoreNav } from '@/core/nav/show/show.dto';
import { core_nav } from '@/database/schema/nav';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminNavStylesArgs } from './create.dto';

@Injectable()
export class CreateAdminNavStylesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async create({
    description,
    external,
    href,
    icon,
    name,
  }: CreateAdminNavStylesArgs): Promise<ShowCoreNav> {
    const theMostHighestPosition =
      await this.databaseService.db.query.core_nav.findFirst({
        where: (table, { eq }) => eq(table.parent_id, 0),
        orderBy: (table, { desc }) => desc(table.position),
      });

    const [nav] = await this.databaseService.db
      .insert(core_nav)
      .values({
        href,
        external,
        icon,
        position: theMostHighestPosition
          ? theMostHighestPosition.position + 1
          : 0,
      })
      .returning();

    const namesNav = await this.stringLanguageHelper.parse({
      item_id: nav.id,
      plugin_code: 'core',
      database: core_nav,
      data: name,
      variable: 'name',
    });

    const descriptionNav = await this.stringLanguageHelper.parse({
      item_id: nav.id,
      plugin_code: 'core',
      database: core_nav,
      data: description,
      variable: 'description',
    });

    return {
      ...nav,
      name: namesNav,
      description: descriptionNav,
      children: [],
    };
  }
}
