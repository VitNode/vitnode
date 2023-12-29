import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShowPostsForumsArgs } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';

@Injectable()
export class ShowPostsForumsService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last, topic_id }: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    const where: Prisma.forum_posts_timelineWhereInput = {
      OR: [
        {
          post: {
            topic: {
              id: topic_id
            }
          }
        },
        {
          log: {
            topic: {
              id: topic_id
            }
          }
        }
      ]
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_posts_timeline.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        orderBy: { created: SortDirectionEnum.asc },
        include: {
          post: {
            include: {
              content: true
            }
          },
          log: true
        }
      }),
      this.prisma.forum_posts_timeline.count({ where })
    ]);

    return outputPagination({
      edges: edges.map(edge => {
        if (edge.log) {
          return {
            ...edge,
            ...edge.log
          };
        }

        return {
          ...edge,
          ...edge.post
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
