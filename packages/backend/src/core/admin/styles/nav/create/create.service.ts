import { ParserTextLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import { ShowCoreNav } from '@/core/nav/show/dto/show.obj';
import {
  core_nav,
  core_nav_description,
  core_nav_name,
} from '@/database/schema/nav';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { CreateAdminNavStylesArgs } from './create.dto';

@Injectable()
export class CreateAdminNavStylesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
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

    const nav = await this.databaseService.db
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

    const id = nav[0].id;

    const namesNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_name,
      data: name,
    });

    const descriptionNav = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_description,
      data: description,
    });

    return {
      ...nav[0],
      name: namesNav,
      description: descriptionNav,
      children: [],
    };
  }
}
