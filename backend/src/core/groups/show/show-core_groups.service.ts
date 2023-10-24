import { Injectable } from '@nestjs/common';

import { ShowCoreGroupsObj } from './dto/show-core_groups.obj';
import { ShowCoreGroupsArgs, ShowCoreGroupsSortingColumnEnum } from './dto/show-core_groups.args';

import { PrismaService } from '@/prisma/prisma.service';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { inputSorting } from '@/functions/database/inputSorting';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { outputPagination } from '@/functions/database/pagination/outputPagination';

@Injectable()
export class ShowCoreGroupsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    search = '',
    sortBy
  }: ShowCoreGroupsArgs): Promise<ShowCoreGroupsObj> {
    const where = {
      OR: [
        {
          name: {
            contains: search
          }
        }
      ]
    };

    const edges = await this.prisma.core_groups.findMany({
      ...inputPagination({ first, cursor }),
      select: {
        id: true,
        name: true,
        created: true
      },
      orderBy: {
        ...inputSorting<ShowCoreGroupsSortingColumnEnum>({
          sortBy,
          defaultSortBy: {
            column: ShowCoreGroupsSortingColumnEnum.created,
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
