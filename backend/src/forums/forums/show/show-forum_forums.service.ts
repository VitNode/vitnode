import { Injectable } from '@nestjs/common';

import { ShowForumForumsArgs } from './dto/show-forum_forums.args';
import { ShowForumForumsObj } from './dto/show-forum_forums.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowForumForumsService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last }: ShowForumForumsArgs): Promise<ShowForumForumsObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_forums.findMany({
        ...inputPagination({ first, cursor, last }),
        include: {
          parent: {
            include: {
              name: true,
              description: true
            }
          },
          name: true,
          description: true
        },
        orderBy: [
          {
            position: SortDirectionEnum.desc
          },
          {
            created: SortDirectionEnum.desc
          }
        ]
      }),
      this.prisma.forum_forums.count()
    ]);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
