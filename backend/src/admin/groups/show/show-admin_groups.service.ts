import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  ShowAdminGroupsArgs,
  ShowAdminGroupsSortingColumnEnum
} from './dto/show-admin_groups.args';
import { ShowAdminGroupsObj } from './dto/show-admin_groups.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { inputSorting } from '@/functions/database/inputSorting';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { outputPagination } from '@/functions/database/pagination/outputPagination';

@Injectable()
export class ShowAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    last,
    search,
    sortBy
  }: ShowAdminGroupsArgs): Promise<ShowAdminGroupsObj> {
    const where: Prisma.core_groupsWhereInput = {
      name: {
        some: {
          value: {
            contains: search,
            mode: 'insensitive'
          }
        }
      }
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_groups.findMany({
        ...inputPagination({ first, cursor, last }),
        select: {
          id: true,
          created: true,
          protected: true,
          default: true,
          root: true,
          guest: true,
          updated: true,
          name: {
            select: {
              id_language: true,
              value: true
            }
          }
        },
        orderBy: inputSorting<ShowAdminGroupsSortingColumnEnum>({
          sortBy,
          defaultSortBy: {
            column: ShowAdminGroupsSortingColumnEnum.updated,
            direction: SortDirectionEnum.desc
          }
        }),
        where
      }),
      this.prisma.core_groups.count()
    ]);

    const currentEdges = await Promise.all(
      edges.map(async edge => {
        return {
          ...edge,
          users_count: await this.prisma.core_members.count({
            where: {
              group_id: edge.id
            }
          })
        };
      })
    );

    return outputPagination({ edges: currentEdges, totalCount, first, cursor, last });
  }
}
