import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { User } from '../../../../utils/decorators/user.decorator';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private prisma: PrismaService) {}

  async show(
    { cursor, first, forum_id, ids, last }: ShowTopicsForumsArgs,
    user?: User
  ): Promise<ShowTopicsForumsObj> {
    const where: Prisma.forum_topicsWhereInput = {
      AND: [
        { forum_id },
        { id: ids ? { in: ids } : undefined },
        {
          OR: [
            user
              ? {
                  forum: {
                    permissions: {
                      some: {
                        group_id: user.group.id,
                        can_view: true
                      }
                    }
                  }
                }
              : {},
            {
              forum: {
                can_all_view: true
              }
            }
          ]
        }
      ]
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_topics.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        include: {
          title: true,
          content: true,
          author: {
            include: {
              avatar: true,
              cover: true,
              group: {
                include: {
                  name: true
                }
              }
            }
          },
          forum: {
            include: {
              name: true
            }
          }
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
