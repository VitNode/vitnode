import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowCoreLanguagesArgs } from './dto/show.args';
import { ShowCoreLanguagesObj } from './dto/show.obj';

import { CustomError } from '@/utils/errors/CustomError';
import { ConfigType } from '@/types/config.type';
import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_languages } from '@/src/admin/core/database/schema/languages';

@Injectable()
export class ShowCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const configFile = fs.readFileSync(join('..', 'config.json'), 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    const edges = await this.databaseService.db.query.core_languages.findMany({
      ...inputPagination({
        cursor,
        first,
        last
      })
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages);

    // Check valid data with config
    edges.forEach(edge => {
      const currentLanguage = config.languages.locales.find(locale => locale.key === edge.code);

      // Check key
      if (!currentLanguage) {
        throw new CustomError({
          code: 'INVALID_CONFIG_WITH_DATABASE',
          message: `Language "${edge.name}" is not found in config.json`
        });
      }

      // Check enabled status
      if (currentLanguage.enabled !== edge.enabled) {
        throw new CustomError({
          code: 'INVALID_CONFIG_WITH_DATABASE',
          message: `Language "${edge.name}" enabled status is not match with config.json`
        });
      }

      // Check valid default language
      if (edge.default && config.languages.default !== edge.code) {
        throw new CustomError({
          code: 'INVALID_CONFIG_WITH_DATABASE',
          message: `Language "${edge.name}" is default but not match with config.json`
        });
      }
    });

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
