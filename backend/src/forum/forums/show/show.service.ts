import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowForumForumsArgs } from './dto/show.args';
import { ShowForumForumsObj } from './dto/show.obj';

import { User } from '@/utils/decorators/user.decorator';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { DatabaseService } from '@/database/database.service';
import { outputPagination } from '@/functions/database/pagination';
import { forum_forums } from '@/src/admin/forum/database/schema/forums';

@Injectable()
export class ShowForumForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, ids, last, parent_id }: ShowForumForumsArgs,
    user?: User
  ): Promise<ShowForumForumsObj> {
    const guestGroupId = await this.databaseService.db.query.core_groups.findFirst({
      where: (table, { eq }) => eq(table.guest, true)
    });

    // const permissionCanView: Prisma.forum_forumsWhereInput[] = [
    //   {
    //     permissions: {
    //       some: {
    //         group_id: user?.group.id ?? guestGroupId,
    //         can_view: true
    //       }
    //     }
    //   },
    //   {
    //     can_all_view: true
    //   }
    // ];

    // const whereWithoutIds: Prisma.forum_forumsWhereInput = {
    //   parent_id: parent_id
    //     ? parent_id
    //     : {
    //         in: null
    //       }
    // };

    // const whereWithIds: Prisma.forum_forumsWhereInput = {
    //   id: {
    //     in: ids
    //   }
    // };

    // const where: Prisma.forum_forumsWhereInput = {
    //   AND: [
    //     ids?.length ? whereWithIds : whereWithoutIds,
    //     {
    //       OR: permissionCanView
    //     }
    //   ]
    // };

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      // ...inputPagination({
      //   cursor,
      //   first,
      //   last
      // }),
      orderBy: (table, { asc }) => [asc(table.position)],
      with: {
        name: true,
        description: true,
        permissions: true,
        parent: {
          with: {
            name: true,
            description: true,
            permissions: true
          }
        }
      }
    });

    const edges = await Promise.all(
      forums.map(async forum => {
        const countChildren = await this.databaseService.db
          .select({ count: count() })
          .from(forum_forums)
          .where(eq(forum_forums.parent_id, forum.id));

        return {
          ...forum,
          parent: { ...forum.parent, _count: { children: 0 } },
          _count: { children: countChildren[0].count },
          children: []
        };
      })
    );

    const totalCount = await this.databaseService.db.select({ count: count() }).from(forum_forums);

    // const [edges, totalCount] = await this.prisma.$transaction([
    //   this.prisma.forum_forums.findMany({
    //     ...inputPagination({ first, cursor, last }),
    //     where,
    //     include: {
    //       permissions: {
    //         where: {
    //           group_id: user?.group.id ?? guestGroupId
    //         }
    //       },
    //       parent: {
    //         include: {
    //           name: true,
    //           description: true,
    //           _count: {
    //             select: {
    //               children: true
    //             }
    //           }
    //         }
    //       },
    //       children: {
    //         where: {
    //           OR: permissionCanView
    //         },
    //         orderBy: [
    //           {
    //             position: SortDirectionEnum.asc
    //           }
    //         ],
    //         include: {
    //           name: true,
    //           description: true,
    //           parent: true,
    //           _count: {
    //             select: {
    //               children: true
    //             }
    //           },
    //           children: {
    //             orderBy: [
    //               {
    //                 position: SortDirectionEnum.asc
    //               }
    //             ],
    //             include: {
    //               name: true,
    //               description: true,
    //               parent: true,
    //               _count: {
    //                 select: {
    //                   children: true
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       name: true,
    //       description: true,
    //       _count: {
    //         select: {
    //           children: true
    //         }
    //       }
    //     },
    //     orderBy: [
    //       {
    //         position: SortDirectionEnum.asc
    //       }
    //     ]
    //   }),
    //   this.prisma.forum_forums.count({ where })
    // ]);

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
