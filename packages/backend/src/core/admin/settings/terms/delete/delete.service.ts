import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_terms } from '@/database/schema/terms';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeleteAdminTermsSettingsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async delete({ code }: { code: string }): Promise<string> {
    const term = await this.databaseService.db.query.core_terms.findFirst({
      where: (table, { eq }) => eq(table.code, code),
      columns: {
        id: true,
      },
    });

    if (!term) {
      throw new NotFoundError('Term');
    }

    await this.databaseService.db
      .delete(core_terms)
      .where(eq(core_terms.id, term.id));

    await this.stringLanguageHelper.delete({
      database: core_terms,
      item_id: term.id,
      plugin_code: 'core',
    });

    return 'Term deleted!';
  }
}
