import { Injectable } from '@nestjs/common';
import { core_moderator_permissions } from '@prisma/client';

import { ShowAdminStaffModeratorsArgs } from './dto/show.args';
import { ShowAdminStaffModeratorsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { inputSorting } from '@/functions/database/inputSorting';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowAdminStaffModeratorsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    last,
    sortBy
  }: ShowAdminStaffModeratorsArgs): Promise<ShowAdminStaffModeratorsObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_moderator_permissions.findMany({
        ...inputPagination({ first, cursor, last }),
        orderBy: inputSorting<keyof core_moderator_permissions>({
          sortBy,
          defaultSortBy: {
            column: 'updated',
            direction: SortDirectionEnum.desc
          }
        }),
        include: {
          group: {
            include: {
              name: true
            }
          },
          member: {
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
      }),
      this.prisma.core_moderator_permissions.count({})
    ]);

    return outputPagination({
      edges: edges.map(edge => {
        if (edge.member) {
          return {
            ...edge,
            user_or_group: {
              ...edge.member
            }
          };
        }

        return {
          ...edge,
          user_or_group: {
            ...edge.group,
            group_name: edge.group.name
          }
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
