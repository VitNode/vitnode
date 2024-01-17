import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowCoreLanguagesArgs } from './dto/show.args';
import { ShowCoreLanguagesObj } from './dto/show.obj';

import { CustomError } from '@/utils/errors/CustomError';
import { ConfigType } from '@/types/config.type';
import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { core_languages } from '@/src/admin/core/database/schema/languages';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { configPath } from '@/config';

@Injectable()
export class ShowCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const configFile = fs.readFileSync(configPath, 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_languages,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_languages.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'id'
      }
    });

    const edges = await this.databaseService.db.query.core_languages.findMany({
      ...pagination,
      columns: {
        id: true,
        code: true,
        name: true,
        default: true,
        enabled: true,
        timezone: true,
        protected: true
      }
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
