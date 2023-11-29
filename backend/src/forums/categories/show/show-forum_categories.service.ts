import { Injectable } from '@nestjs/common';

import { ShowForumCategoriesArgs } from './dto/show-forum_categories.args';
import { ShowForumCategoriesObj } from './dto/show-forum_categories.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowForumCategoriesService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first, last }: ShowForumCategoriesArgs): Promise<ShowForumCategoriesObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forums_categories.findMany({
        ...inputPagination({ first, cursor, last }),
        select: {
          id: true,
          name: true,
          description: true,
          position: true,
          created: true
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
      this.prisma.forums_categories.count()
    ]);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
