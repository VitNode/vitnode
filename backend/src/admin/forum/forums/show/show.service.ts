import { Injectable } from "@nestjs/common";
import { and, count, eq, isNull } from "drizzle-orm";

import { ShowForumForumsAdminObj } from "./dto/show.obj";
import { ShowForumForumsAdminArgs } from "./dto/show.args";

import { DatabaseService } from "@/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { forum_forums } from "@/src/admin/forum/database/schema/forums";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

@Injectable()
export class ShowForumForumsAdminService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    parent_id,
    show_all_forums
  }: ShowForumForumsAdminArgs): Promise<ShowForumForumsAdminObj> {
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

    const where = !parent_id
      ? isNull(forum_forums.parent_id)
      : eq(forum_forums.parent_id, parent_id);

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...pagination,
      where: show_all_forums ? pagination.where : and(pagination.where, where),
      with: {
        name: true,
        description: true,
        parent: {
          with: {
            name: true,
            description: true
          }
        },
        permissions: true
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_forums)
      .where(where);

    const edges = await Promise.all(
      forums.map(async forum => {
        const children = show_all_forums
          ? []
          : await this.databaseService.db.query.forum_forums.findMany({
              where: eq(forum_forums.parent_id, forum.id),
              orderBy: (table, { asc }) => [asc(table.position)],
              with: {
                name: true,
                description: true,
                permissions: true
              }
            });

        return {
          ...forum,
          parent: forum.parent_id
            ? { ...forum.parent, _count: { children: 0 } }
            : null,
          permissions: {
            can_all_view: forum.can_all_view,
            can_all_read: forum.can_all_read,
            can_all_create: forum.can_all_create,
            can_all_reply: forum.can_all_reply,
            groups: forum.permissions
          },
          _count: { children: children.length },
          children: await Promise.all(
            children.map(async child => {
              const children =
                await this.databaseService.db.query.forum_forums.findMany({
                  where: eq(forum_forums.parent_id, child.id),
                  orderBy: (table, { asc }) => [asc(table.position)],
                  with: {
                    name: true,
                    description: true,
                    permissions: true
                  }
                });

              return {
                ...child,
                children: children.map(child => ({
                  ...child,
                  permissions: {
                    can_all_view: child.can_all_view,
                    can_all_read: child.can_all_read,
                    can_all_create: child.can_all_create,
                    can_all_reply: child.can_all_reply,
                    groups: child.permissions
                  }
                })),
                _count: { children: children.length }
              };
            })
          )
        };
      })
    );

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
