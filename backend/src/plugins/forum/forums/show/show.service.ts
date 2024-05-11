import { Injectable } from "@nestjs/common";
import { SQL, and, count, eq, ilike, inArray, or } from "drizzle-orm";

import { ShowForumForumsArgs } from "./dto/show.args";
import {
  ShowForumForumsObj,
  ShowForumForumsWithChildren
} from "./dto/show.obj";
import { StatsShowForumForumsService } from "./stats.service";
import { LastPostsForumForumsService } from "./last_posts/last_posts.service";

import { User } from "@/utils/decorators/user.decorator";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import {
  forum_forums,
  forum_forums_name
} from "@/plugins/forum/admin/database/schema/forums";
import { DatabaseService } from "@/database/database.service";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";

interface ShowArgs extends ShowForumForumsArgs {
  isAdmin?: boolean;
}

interface ShowForumForumsWithPermissions
  extends Omit<ShowForumForumsWithChildren, "permissions"> {
  can_all_create: boolean;
  can_all_download_files: boolean;
  can_all_read: boolean;
  can_all_reply: boolean;
  can_all_view: boolean;
  permissions: {
    can_create: boolean;
    can_download_files: boolean;
    can_read: boolean;
    can_reply: boolean;
    can_view: boolean;
    forum_id: number;
    group_id: number;
    id: number;
  }[];
}

@Injectable()
export class ShowForumForumsService {
  constructor(
    private databaseService: DatabaseService,
    private statsService: StatsShowForumForumsService,
    private lastPostsService: LastPostsForumForumsService
  ) {}

  protected async whereAccessToView({
    isAdmin,
    user
  }: {
    user: User | null;
    isAdmin?: boolean;
  }): Promise<SQL<unknown>> {
    if (isAdmin) return undefined;

    const forumIds =
      await this.databaseService.db.query.forum_forums_permissions.findMany({
        columns: {
          forum_id: true
        },
        where: (table, { and, eq }) =>
          and(
            eq(table.group_id, user?.group.id ?? 1), // 1 - guest group id
            eq(table.can_view, true)
          )
      });

    const forumIdsSQL =
      forumIds.length > 0
        ? inArray(
            forum_forums.id,
            forumIds.map(({ forum_id }) => forum_id)
          )
        : undefined;

    return or(eq(forum_forums.can_all_view, true), forumIdsSQL);
  }

  async getData(
    {
      cursor,
      first,
      ids,
      isAdmin,
      last,
      last_posts_args,
      parent_id,
      search,
      show_all_forums
    }: ShowArgs,
    user: User | null
  ): Promise<{
    edges: ShowForumForumsWithPermissions[];
    searchIds: number[];
    where: SQL<unknown>;
  }> {
    let searchIds: number[] = [];

    // Get forum ids by search
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
      primaryCursor: {
        column: "id",
        schema: forum_forums.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: "position"
      }
    });

    const idsCondition =
      ids?.length > 0 ? inArray(forum_forums.id, ids) : undefined;

    const whereAccess = await this.whereAccessToView({ user, isAdmin });
    const where = and(
      pagination.where,
      whereAccess,
      show_all_forums
        ? idsCondition
        : idsCondition || eq(forum_forums.parent_id, parent_id ?? 0),
      searchIds.length > 0 ? inArray(forum_forums.id, searchIds) : undefined
    );

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...pagination,
      where,
      with: {
        name: true,
        description: true,
        permissions: true
      }
    });

    const edges: ShowForumForumsWithPermissions[] = await Promise.all(
      forums.map(async forum => {
        // If show_all_forums is true, we don't need to fetch children
        const children = show_all_forums
          ? []
          : await this.databaseService.db.query.forum_forums.findMany({
              where: and(eq(forum_forums.parent_id, forum.id), whereAccess),
              orderBy: (table, { asc }) => [asc(table.position)],
              with: {
                name: true,
                description: true,
                permissions: true
              }
            });

        const { stats, topic_ids } = await this.statsService.topicsPosts({
          forumId: forum.id,
          user
        });

        const breadcrumbs = await this.statsService.breadcrumbs({
          forumId: forum.id
        });

        const last_posts = await this.lastPostsService.lastPosts({
          topicIds: topic_ids,
          ...last_posts_args
        });

        return {
          ...forum,
          last_posts,
          _count: {
            ...stats
          },
          breadcrumbs,
          children: await Promise.all(
            children.map(async child => {
              const children =
                await this.databaseService.db.query.forum_forums.findMany({
                  where: and(eq(forum_forums.parent_id, child.id), whereAccess),
                  orderBy: (table, { asc }) => [asc(table.position)],
                  with: {
                    name: true,
                    description: true,
                    permissions: true
                  }
                });

              const { stats, topic_ids } = await this.statsService.topicsPosts({
                forumId: child.id,
                user
              });
              const breadcrumbs = await this.statsService.breadcrumbs({
                forumId: child.id
              });
              const last_posts = await this.lastPostsService.lastPosts({
                topicIds: topic_ids,
                ...last_posts_args
              });

              return {
                ...child,
                children,
                last_posts,
                breadcrumbs,
                _count: {
                  ...stats
                }
              };
            })
          )
        };
      })
    );

    return { edges, where, searchIds };
  }

  async show(
    { cursor, first, ids, last, search, ...rest }: ShowArgs,
    user: User | null
  ): Promise<ShowForumForumsObj> {
    const { edges, searchIds, where } = await this.getData(
      {
        cursor,
        first,
        ids,
        last,
        search,
        ...rest
      },
      user
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
              const permissions = edge.permissions.at(0);

              if (!user) {
                return {
                  ...edge,
                  permissions: {
                    can_create: false,
                    can_read: permissions?.can_read || edge.can_all_read,
                    can_reply: false
                  }
                };
              }

              return {
                ...edge,
                permissions: {
                  can_create: permissions?.can_create || edge.can_all_create,
                  can_read: permissions?.can_read || edge.can_all_read,
                  can_reply: permissions?.can_reply || edge.can_all_reply,
                  can_download_files:
                    permissions?.can_download_files ||
                    edge.can_all_download_files
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
