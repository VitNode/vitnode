import { Injectable } from "@nestjs/common";
import { and, asc, count, eq, or } from "drizzle-orm";

import { ShowTopicsForumsArgs } from "./dto/show.args";
import { PermissionsTopicForums, ShowTopicsForumsObj } from "./dto/show.obj";

import { User } from "@/utils/decorators/user.decorator";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { forum_topics } from "@/plugins/forum/admin/database/schema/topics";
import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { StatsShowForumForumsService } from "../../forums/show/stats.service";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";

@Injectable()
export class ShowTopicsForumsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly statsForumService: StatsShowForumForumsService
  ) {}

  async show(
    { cursor, first, forum_id, id, last }: ShowTopicsForumsArgs,
    user: User | null
  ): Promise<ShowTopicsForumsObj> {
    if (!forum_id && !id) {
      throw new CustomError({
        code: "FORUM_TOPIC_SHOW_NO_ID",
        message: "No forum_id or id provided"
      });
    }

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_topics,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: forum_topics.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      }
    });

    const where = and(
      or(
        forum_id ? eq(forum_topics.forum_id, forum_id) : undefined,
        id ? eq(forum_topics.id, id) : undefined
      )
    );

    const edges = await this.databaseService.db.query.forum_topics.findMany({
      ...pagination,
      where: and(pagination.where, where),
      limit: id ? 1 : pagination.limit,
      with: {
        forum: {
          with: {
            name: true,
            permissions: {
              where: (table, { eq }) => eq(table.group_id, user?.group.id ?? 1) // 1 = guest
            }
          }
        },
        title: true,
        posts: {
          orderBy: [asc(forum_posts.created)],
          limit: 1,
          with: {
            content: true,
            user: {
              with: {
                avatar: true,
                group: {
                  with: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_topics)
      .where(where);

    return outputPagination({
      edges: await Promise.all(
        edges
          .map(async edge => {
            // Check permissions
            if (!edge.forum.can_all_view && !edge.forum.permissions.length) {
              if (id && edges.length === 1) {
                throw new AccessDeniedError();
              }

              return null;
            }

            const post = edge.posts.at(0);
            if (!post) return null;

            const breadcrumbs = await this.statsForumService.breadcrumbs({
              forumId: edge.forum.id
            });

            const permissionsData = edge.forum.permissions.at(0);
            const permissions: PermissionsTopicForums = user
              ? {
                  can_reply:
                    permissionsData?.can_reply || edge.forum.can_all_reply,
                  can_edit: user.id === post.user.id,
                  can_download_files:
                    permissionsData?.can_download_files ||
                    edge.forum.can_all_download_files
                }
              : {
                  can_reply: false,
                  can_edit: false,
                  can_download_files:
                    permissionsData?.can_download_files ||
                    edge.forum.can_all_download_files
                };

            return {
              ...edge,
              user: post.user,
              content: post.content,
              breadcrumbs,
              permissions
            };
          })
          .filter(edge => edge !== null)
      ),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
