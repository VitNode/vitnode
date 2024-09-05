import { ParserTextLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import {
  core_terms,
  core_terms_content,
  core_terms_title,
} from '@/database/schema/terms';
import { CustomError, NotFoundError } from '@/errors';
import { removeSpecialCharacters } from '@/functions';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { EditAdminTermsSettingsArgs } from './edit.dto';

@Injectable()
export class EditAdminTermsSettingsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async edit({
    title,
    content,
    href,
    code,
    id,
  }: EditAdminTermsSettingsArgs): Promise<ShowCoreTerms> {
    const term = await this.databaseService.db.query.core_terms.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!term) {
      throw new NotFoundError('Term');
    }

    const termExist = await this.databaseService.db.query.core_terms.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (termExist && termExist.code !== term.code) {
      throw new CustomError({
        code: 'ALREADY_EXISTS',
        message: 'Term already exists',
      });
    }

    await this.databaseService.db
      .update(core_terms)
      .set({ href, updated: new Date(), code: removeSpecialCharacters(code) })
      .where(eq(core_terms.id, id));

    const titleTerm = await this.parserTextLang.parse({
      item_id: term.id,
      database: core_terms_title,
      data: title,
    });
    const contentTerm = await this.parserTextLang.parse({
      item_id: term.id,
      database: core_terms_content,
      data: content,
    });

    return {
      ...term,
      title: titleTerm,
      content: contentTerm,
    };
  }
}
