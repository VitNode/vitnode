import { ParserStringLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import {
  core_nav,
  core_nav_description,
  core_nav_name,
} from '@/database/schema/nav';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteAdminNavStylesArgs } from './delete.dto';

@Injectable()
export class DeleteAdminNavStylesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserStringLanguageCoreHelpersService,
  ) {}

  async delete({ id }: DeleteAdminNavStylesArgs): Promise<string> {
    const nav = await this.databaseService.db.query.core_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!nav) {
      throw new NotFoundError('Nav');
    }

    // Update parent_id to 0
    await this.databaseService.db
      .update(core_nav)
      .set({ parent_id: 0 })
      .where(eq(core_nav.parent_id, id));

    await this.parserTextLang.delete({
      database: core_nav_name,
      item_id: id,
    });

    // TODO: Check if it's necessary to delete
    await this.parserTextLang.delete({
      database: core_nav_description,
      item_id: id,
    });

    // Delete nav
    await this.databaseService.db.delete(core_nav).where(eq(core_nav.id, id));

    return 'Success!';
  }
}
