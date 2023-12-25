import { Injectable } from '@nestjs/common';

import { ShowAdminStaffAdministratorsArgs } from './dto/show.args';
import { ShowAdminStaffAdministratorsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';

@Injectable()
export class ShowAdminStaffAdministratorsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    last
  }: ShowAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministratorsObj> {
    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_admin_permissions.findMany({
        ...inputPagination({ first, cursor, last }),
        include: {
          group: {
            include: {
              name: true
            }
          },
          member: {
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
        }
      }),
      this.prisma.core_members.count({})
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
            ...edge.group
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
