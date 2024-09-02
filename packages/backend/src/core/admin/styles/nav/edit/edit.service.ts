import { ParserTextLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import { ShowCoreNav } from '@/core/nav/show/dto/show.obj';
import {
  core_nav,
  core_nav_description,
  core_nav_name,
} from '@/database/schema/nav';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { EditAdminNavStylesArgs } from './edit.dto';

@Injectable()
export class EditAdminNavStylesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async edit({
    description,
    external,
    href,
    icon,
    id,
    name,
  }: EditAdminNavStylesArgs): Promise<ShowCoreNav> {
    const nav = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!nav) {
      throw new NotFoundError('Nav');
    }

    const updatedNav = await this.databaseService.db
      .update(core_nav)
      .set({
        href,
        external,
        icon,
      })
      .where(eq(core_nav.id, id))
      .returning();

    const updatedName = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_name,
      data: name,
    });

    const updatedDescription = await this.parserTextLang.parse({
      item_id: id,
      database: core_nav_description,
      data: description,
    });

    const children = await this.databaseService.db.query.core_nav.findMany({
      where: (table, { eq }) => eq(table.parent_id, id),
      with: {
        name: true,
        description: true,
      },
    });

    return {
      ...updatedNav[0],
      name: updatedName,
      description: updatedDescription,
      children,
    };
  }
}
