import * as config from '~/config.json';

import { Injectable } from '@nestjs/common';

import { ShowCoreLanguagesArgs } from './dto/show-core_languages.args';
import { ShowCoreLanguagesObj } from './dto/show-core_languages.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class ShowCoreLanguageService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_languages.findMany({
        ...inputPagination({ first, cursor, last }),
        select: {
          id: true,
          name: true,
          timezone: true,
          protected: true,
          default: true,
          enabled: true
        }
      }),
      this.prisma.core_languages.count()
    ]);

    // Check valid data with config
    edges.forEach(edge => {
      const currentLanguage = config.languages.locales.find(locale => locale.key === edge.id);

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
    });

    // Check valid default language
    if (!edges.find(edge => edge.default && edge.id === config.languages.default)) {
      throw new CustomError({
        code: 'INVALID_CONFIG_WITH_DATABASE',
        message: `Default language is not found in config.json`
      });
    }

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
