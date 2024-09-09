import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_nav } from '@/database/schema/nav';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeleteAdminNavStylesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async delete({ id }: { id: number }): Promise<string> {
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

    // Delete nav
    await this.databaseService.db.delete(core_nav).where(eq(core_nav.id, id));

    await this.stringLanguageHelper.delete({
      database: core_nav,
      item_id: id,
      plugin_code: 'core',
    });

    return 'Success!';
  }
}
