import { Injectable } from '@nestjs/common';
import { Prisma, core_members } from '@prisma/client';

import { ShowCoreMembersObj } from './dto/show.obj';
import { ShowCoreMembersArgs } from './dto/show.args';

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
    findByIds,
    first,
    last,
    search,
    sortBy
  }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    const where: Prisma.core_membersWhereInput = findByIds
      ? { id: { in: findByIds, mode: 'insensitive' } }
      : {
          OR: [
            {
              name: {
                contains: search ?? ''
              }
            }
          ]
        };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.core_members.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        include: {
          avatar: true,
          cover: true,
          group: {
            include: {
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
        })
      }),
      this.prisma.core_members.count({
        where
      })
    ]);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
