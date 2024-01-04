import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { User } from '@/utils/decorators/user.decorator';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private prisma: PrismaService) {}

  async show(
    { cursor, first, forum_id, id, last }: ShowTopicsForumsArgs,
    user?: User
  ): Promise<ShowTopicsForumsObj> {
    const where: Prisma.forum_topicsWhereInput = {
      AND: [
        { forum_id },
        { id },
        {
          OR: [
            {
              forum: {
                permissions: {
                  some: {
                    group_id:
                      user?.group.id ??
                      (
                        await this.prisma.core_groups.findFirst({
                          where: {
                            guest: true
                          }
                        })
                      ).id,
                    can_read: true
                  }
                }
              }
            },
            {
              forum: {
                can_all_read: true
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
          forum: {
            include: {
              name: true
            }
          },
          posts: {
            take: 1,
            orderBy: [
              {
                created: SortDirectionEnum.asc
              }
            ],
            include: {
              content: true,
              author: {
                include: {
                  avatar: true,
                  group: {
                    include: {
                      name: true
                    }
                  }
                }
              }
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
      edges: edges
        .map(edge => {
          const post = edge.posts.at(0);
          if (!post) return null;

          return { ...edge, author: post.author, content: post.content };
        })
        .filter(edge => edge !== null),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
