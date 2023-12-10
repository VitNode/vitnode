import { Injectable } from '@nestjs/common';
import { Prisma, core_members } from '@prisma/client';

import { ShowAdminMembersObj } from './dto/show-admin_members.obj';
import { ShowAdminMembersArgs } from './dto/show-admin_members.args';

import { PrismaService } from '@/prisma/prisma.service';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputSorting } from '@/functions/database/inputSorting';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowAdminMembersService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    groups,
    last,
    search,
    sortBy
  }: ShowAdminMembersArgs): Promise<ShowAdminMembersObj> {
    const where: Prisma.core_membersWhereInput = {
      OR: [
        {
          name: {
            contains: search ?? '',
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: search ?? '',
            mode: 'insensitive'
          }
        },
        {
          id: {
            contains: search ?? '',
            mode: 'insensitive'
          }
        }
      ],
      AND: [
        {
          group: {
            id: {
              in: groups && groups.length > 0 ? groups : undefined
            }
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
          email: true,
          joined: true,
          birthday: true,
          posts: true,
          followers: true,
          reactions: true,
          newsletter: true,
          avatar_color: true,
          unread_notifications: true,
          avatar: true,
          cover: true,
          group: {
            select: {
              name: true
            }
          }
        },
        orderBy: inputSorting<keyof core_members>({
          sortBy,
          defaultSortBy: {
            column: 'joined',
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
