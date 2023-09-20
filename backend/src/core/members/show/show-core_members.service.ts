import { Injectable } from '@nestjs/common';

import { ShowCoreMembersObj } from './dto/show-core_members.obj';
import {
  ShowCoreMembersArgs,
  ShowCoreMembersSortingColumnEnum
} from './dto/show-core_members.args';

import { PrismaService } from '@/src/prisma/prisma.service';
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
    search = '',
    sortBy
  }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    const where = {
      OR: [
        {
          name: {
            contains: search
          }
        },
        {
          email: {
            contains: search
          }
        }
      ]
    };

    const edges = await this.prisma.core_members.findMany({
      ...inputPagination({ first, cursor }),
      select: {
        id: true,
        name: true,
        name_seo: true,
        email: true,
        group_id: true,
        joined: true,
        birthday: true,
        avatar: true,
        image_cover: true,
        posts: true,
        followers: true,
        reactions: true,
        newsletter: true,
        avatar_color: true,
        unread_notifications: true
      },
      orderBy: {
        ...inputSorting<ShowCoreMembersSortingColumnEnum>({
          sortBy,
          defaultSortBy: {
            column: ShowCoreMembersSortingColumnEnum.joined,
            direction: SortDirectionEnum.asc
          }
        })
      },
      where
    });

    const totalCount = await this.prisma.core_members.count({
      where
    });

    return outputPagination({ edges, totalCount, first, cursor });
  }
}
