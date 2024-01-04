import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShowForumForumsArgs } from './dto/show.args';
import { ShowForumForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { User } from '@/utils/decorators/user.decorator';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';

@Injectable()
export class ShowForumForumsService {
  constructor(private prisma: PrismaService) {}

  async show(
    { cursor, first, ids, last, parent_id }: ShowForumForumsArgs,
    user?: User
  ): Promise<ShowForumForumsObj> {
    const guestGroupId = (
      await this.prisma.core_groups.findFirst({
        where: {
          guest: true
        },
        select: {
          id: true
        }
      })
    )?.id;

    const permissionCanView: Prisma.forum_forumsWhereInput[] = [
      {
        permissions: {
          some: {
            group_id: user?.group.id ?? guestGroupId,
            can_view: true
          }
        }
      },
      {
        can_all_view: true
      }
    ];

    const whereWithoutIds: Prisma.forum_forumsWhereInput = {
      parent_id: parent_id
        ? parent_id
        : {
            in: null
          }
    };

    const whereWithIds: Prisma.forum_forumsWhereInput = {
      id: {
        in: ids
      }
    };

    const where: Prisma.forum_forumsWhereInput = {
      AND: [
        ids?.length ? whereWithIds : whereWithoutIds,
        {
          OR: permissionCanView
        }
      ]
    };

    const [edges, totalCount] = await this.prisma.$transaction([
      this.prisma.forum_forums.findMany({
        ...inputPagination({ first, cursor, last }),
        where,
        include: {
          permissions: {
            where: {
              group_id: user?.group.id ?? guestGroupId
            }
          },
          parent: {
            include: {
              name: true,
              description: true,
              _count: {
                select: {
                  children: true
                }
              }
            }
          },
          children: {
            where: {
              OR: permissionCanView
            },
            orderBy: [
              {
                position: SortDirectionEnum.asc
              }
            ],
            include: {
              name: true,
              description: true,
              parent: true,
              _count: {
                select: {
                  children: true
                }
              },
              children: {
                orderBy: [
                  {
                    position: SortDirectionEnum.asc
                  }
                ],
                include: {
                  name: true,
                  description: true,
                  parent: true,
                  _count: {
                    select: {
                      children: true
                    }
                  }
                }
              }
            }
          },
          name: true,
          description: true,
          _count: {
            select: {
              children: true
            }
          }
        },
        orderBy: [
          {
            position: SortDirectionEnum.asc
          }
        ]
      }),
      this.prisma.forum_forums.count({ where })
    ]);

    if (edges.length === 1 && ids?.length > 0) {
      const firstEdge = edges.at(0);

      if (!(firstEdge.permissions.at(0)?.can_read || firstEdge.can_all_read)) {
        throw new AccessDeniedError();
      }
    }

    return outputPagination({
      edges: edges.map(edge => {
        if (!user) {
          return {
            ...edge,
            permissions: {
              can_create: false,
              can_read: edge.permissions.at(0)?.can_read || edge.can_all_read,
              can_reply: false
            }
          };
        }

        return {
          ...edge,
          permissions: {
            can_create: edge.permissions.at(0)?.can_create || edge.can_all_create,
            can_read: edge.permissions.at(0)?.can_read || edge.can_all_read,
            can_reply: edge.permissions.at(0)?.can_reply || edge.can_all_reply
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
