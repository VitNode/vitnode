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

  async show({ cursor, first, last, parent_id }: ShowForumForumsArgs): Promise<ShowForumForumsObj> {
    const where = {
      parent_id: parent_id
        ? parent_id
        : {
            in: null
          }
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_forums.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        include: {
          parent: {
            include: {
              name: true,
              description: true,
              _count: {
                select: {
                  children: true
                }
              }
            }
          },
          children: {
            include: {
              name: true,
              description: true,
              parent: true,
              _count: {
                select: {
                  children: true
                }
              }
            }
          },
          name: true,
          description: true,
          _count: {
            select: {
              children: true
            }
          }
        },
        orderBy: [
          {
            position: SortDirectionEnum.asc
          }
        ]
      }),
      this.prisma.forum_forums.count({ where })
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
