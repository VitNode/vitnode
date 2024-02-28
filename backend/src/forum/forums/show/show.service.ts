import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike, inArray, isNull, or } from "drizzle-orm";

import { ShowForumForumsArgs } from "./dto/show.args";
import { ShowForumForumsObj } from "./dto/show.obj";

import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DatabaseService } from "@/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import {
  forum_forums,
  forum_forums_name
} from "@/src/admin/forum/database/schema/forums";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

@Injectable()
export class ShowForumForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    {
      cursor,
      first,
      ids,
      last,
      parent_id,
      search,
      show_all_forums
    }: ShowForumForumsArgs,
    user: User | null
  ): Promise<ShowForumForumsObj> {
    let searchIds: number[] = [];

    if (search) {
      searchIds = await this.databaseService.db
        .select({ forum_id: forum_forums_name.id })
        .from(forum_forums_name)
        .where(ilike(forum_forums_name.value, `%${search}%`))
        .then(res => res.map(({ forum_id }) => forum_id));
    }

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_forums,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: forum_forums.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: "position"
      }
    });

    const forumIdsWithAccess =
      await this.databaseService.db.query.forum_forums_permissions.findMany({
        columns: {
          forum_id: true
        },
        where: (table, { eq }) => eq(table.group_id, user?.group.id ?? 1) // 1 - guest group id
      });

    const wherePermissions = and(
      or(
        eq(forum_forums.can_all_view, true),
        forumIdsWithAccess.length > 0
          ? inArray(
              forum_forums.id,
              forumIdsWithAccess.map(({ forum_id }) => forum_id)
            )
          : undefined
      )
    );

    const whereParent = parent_id
      ? eq(forum_forums.parent_id, parent_id)
      : isNull(forum_forums.parent_id);

    const idsCondition =
      ids?.length > 0 ? inArray(forum_forums.id, ids) : undefined;

    const where = and(
      pagination.where,
      wherePermissions,
      show_all_forums ? idsCondition : idsCondition || whereParent,
      searchIds.length > 0 ? inArray(forum_forums.id, searchIds) : undefined
    );

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...pagination,
      where,
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
        },
        topics: {
          with: {
            posts: true
          }
        }
      }
    });

    const edges = await Promise.all(
      forums.map(async forum => {
        const children = show_all_forums
          ? []
          : await this.databaseService.db.query.forum_forums.findMany({
              where: and(
                eq(forum_forums.parent_id, forum.id),
                wherePermissions
              ),
              orderBy: (table, { asc }) => [asc(table.position)],
              with: {
                name: true,
                description: true,
                permissions: true,
                topics: {
                  with: {
                    posts: true
                  }
                }
              }
            });

        return {
          ...forum,
          parent: forum.parent_id
            ? { ...forum.parent, _count: { children: 0, topics: 0, posts: 0 } }
            : null,
          _count: {
            children: children.length,
            topics: forum.topics.length,
            posts: forum.topics.reduce(
              (acc, item) => acc + item.posts.length,
              0
            )
          },
          children: await Promise.all(
            children.map(async child => {
              const children =
                await this.databaseService.db.query.forum_forums.findMany({
                  where: and(
                    eq(forum_forums.parent_id, child.id),
                    wherePermissions
                  ),
                  orderBy: (table, { asc }) => [asc(table.position)],
                  with: {
                    name: true,
                    description: true,
                    permissions: true,
                    topics: {
                      with: {
                        posts: true
                      }
                    }
                  }
                });

              return {
                ...child,
                children,
                _count: {
                  children: children.length,
                  topics: child.topics.length,
                  posts: child.topics.reduce(
                    (acc, item) => acc + item.posts.length,
                    0
                  )
                }
              };
            })
          )
        };
      })
    );

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_forums)
      .where(where);

    if (edges.length === 1 && ids?.length > 0) {
      const firstEdge = edges.at(0);

      if (!(firstEdge.permissions.at(0)?.can_read || firstEdge.can_all_read)) {
        throw new AccessDeniedError();
      }
    }

    return outputPagination({
      edges:
        search && searchIds.length === 0
          ? []
          : edges.map(edge => {
              if (!user) {
                return {
                  ...edge,
                  permissions: {
                    can_create: false,
                    can_read:
                      edge.permissions.at(0)?.can_read || edge.can_all_read,
                    can_reply: false
                  }
                };
              }

              return {
                ...edge,
                permissions: {
                  can_create:
                    edge.permissions.at(0)?.can_create || edge.can_all_create,
                  can_read:
                    edge.permissions.at(0)?.can_read || edge.can_all_read,
                  can_reply:
                    edge.permissions.at(0)?.can_reply || edge.can_all_reply
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
