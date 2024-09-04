import { ParserTextLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import {
  core_terms,
  core_terms_content,
  core_terms_title,
} from '@/database/schema/terms';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeleteAdminTermsSettingsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async delete({ id }: { id: number }): Promise<string> {
    const term = await this.databaseService.db.query.core_terms.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!term) {
      throw new NotFoundError('Term');
    }

    await this.parserTextLang.delete({
      database: core_terms_title,
      item_id: id,
    });

    await this.parserTextLang.delete({
      database: core_terms_content,
      item_id: id,
    });

    await this.databaseService.db
      .delete(core_terms)
      .where(eq(core_terms.id, id));

    return 'Term deleted!';
  }
}
