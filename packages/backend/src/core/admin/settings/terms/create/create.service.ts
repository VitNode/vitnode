import { ParserTextLanguageCoreHelpersService } from '@/core/helpers/text_language/parser/parser.service';
import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import {
  core_terms,
  core_terms_content,
  core_terms_title,
} from '@/database/schema/terms';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';

import { CreateAdminTermsSettingsArgs } from './create.dto';

@Injectable()
export class CreateAdminTermsSettingsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService,
  ) {}

  async create({
    title,
    content,
    href,
  }: CreateAdminTermsSettingsArgs): Promise<ShowCoreTerms> {
    const [term] = await this.databaseService.db
      .insert(core_terms)
      .values({ href })
      .returning();

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
