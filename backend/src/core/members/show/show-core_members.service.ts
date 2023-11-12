import { Injectable } from '@nestjs/common';

import { ShowCoreMembersObj } from './dto/show-core_members.obj';
import {
  ShowCoreMembersArgs,
  ShowCoreMembersSortingColumnEnum
} from './dto/show-core_members.args';

import { PrismaService } from '@/prisma/prisma.service';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputSorting } from '@/functions/database/inputSorting';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowCoreMembersService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    last,
    search,
    sortBy
  }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    const where = {
      OR: [
        {
          name: {
            contains: search ?? ''
          }
        },
        {
          email: {
            contains: search ?? ''
          }
        }
      ]
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_members.findMany({
        ...inputPagination({ first, cursor, last }),
        select: {
          id: true,
          name: true,
          joined: true,
          birthday: true,
          posts: true,
          followers: true,
          reactions: true,
          avatar_color: true,
          avatar: true,
          cover: true,
          group: {
            select: {
              name: true
            }
          }
        },
        orderBy: inputSorting<ShowCoreMembersSortingColumnEnum>({
          sortBy,
          defaultSortBy: {
            column: ShowCoreMembersSortingColumnEnum.joined,
            direction: SortDirectionEnum.desc
          }
        }),
        where
      }),
      this.prisma.core_members.count({
        where
      })
    ]);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
