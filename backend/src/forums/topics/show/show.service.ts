import { Injectable } from '@nestjs/common';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last }: ShowTopicsForumsArgs): Promise<ShowTopicsForumsObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_topics.findMany({
        ...inputPagination({ first, cursor, last }),
        include: {
          name: true,
          content: true
        },
        orderBy: [
          {
            created: SortDirectionEnum.asc
          }
        ]
      }),
      this.prisma.forum_forums.count()
    ]);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
