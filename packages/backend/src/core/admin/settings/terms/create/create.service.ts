import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import { core_terms } from '@/database/schema/terms';
import { CustomError } from '@/errors';
import { removeSpecialCharacters } from '@/functions';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';

import { CreateAdminTermsSettingsArgs } from './create.dto';

@Injectable()
export class CreateAdminTermsSettingsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async create({
    title,
    content,
    href,
    code,
  }: CreateAdminTermsSettingsArgs): Promise<ShowCoreTerms> {
    const termExist = await this.databaseService.db.query.core_terms.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (termExist) {
      throw new CustomError({
        code: 'ALREADY_EXISTS',
        message: 'Term already exists',
      });
    }

    const [term] = await this.databaseService.db
      .insert(core_terms)
      .values({ href, code: removeSpecialCharacters(code) })
      .returning();

    const titleTerm = await this.stringLanguageHelper.parse({
      item_id: term.id,
      plugin_code: 'core',
      database: core_terms,
      data: title,
      variable: 'title',
    });

    const contentTerm = await this.stringLanguageHelper.parse({
      item_id: term.id,
      plugin_code: 'core',
      database: core_terms,
      data: content,
      variable: 'content',
    });

    return {
      ...term,
      title: titleTerm,
      content: contentTerm,
    };
  }
}
