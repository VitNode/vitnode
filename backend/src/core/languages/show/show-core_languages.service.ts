import { Injectable } from '@nestjs/common';

import { ShowCoreLanguagesArgs } from './dto/show-core_languages.args';
import { ShowCoreLanguagesObj } from './dto/show-core_languages.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';

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

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
