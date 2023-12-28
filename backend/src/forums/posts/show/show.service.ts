import { Injectable } from '@nestjs/common';

import { ShowPostsForumsArgs } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';

@Injectable()
export class ShowPostsForumsService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last }: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_posts.findMany({
        ...inputPagination({ first, cursor, last }),
        include: {
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
          }
        },
        orderBy: [
          {
            created: SortDirectionEnum.desc
          }
        ]
      }),
      this.prisma.forum_posts.count()
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
