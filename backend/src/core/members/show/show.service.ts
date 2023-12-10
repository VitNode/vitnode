import { Injectable } from '@nestjs/common';
import { core_members } from '@prisma/client';

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
    const where = findByIds
      ? { id: { in: findByIds } }
      : {
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
              name: {
                select: {
                  value: true,
                  id_language: true
                }
              }
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
