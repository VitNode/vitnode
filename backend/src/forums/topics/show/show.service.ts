import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    forum_id,
    last
  }: ShowTopicsForumsArgs): Promise<ShowTopicsForumsObj> {
    const where: Prisma.forum_topicsWhereInput = {
      forum_id
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_topics.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        include: {
          title: true,
          content: true
        },
        orderBy: [
          {
            created: SortDirectionEnum.desc
          }
        ]
      }),
      this.prisma.forum_topics.count({ where })
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
