import { Injectable } from "@nestjs/common";
import { and, count, eq } from "drizzle-orm";

import {
  ShowPostsForumsArgs,
  ShowPostsForumsSortingEnum
} from "./dto/show.args";
import { ShowPostsForumsObj } from "./dto/show.obj";

import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { DatabaseService } from "@/plugins/database/database.service";
import { forum_posts_timeline } from "@/plugins/forum/admin/database/schema/posts";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

@Injectable()
export class ShowPostsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, firstEdges, last, sortBy, topic_id }: ShowPostsForumsArgs,
    user: User | null
  ): Promise<ShowPostsForumsObj> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, topic_id),
      with: {
        forum: {
          with: {
            permissions: {
              where: (table, { eq }) => eq(table.group_id, user?.group.id ?? 1) // 1 = guest
            }
          }
        }
      }
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    if (!topic.forum.can_all_read && !topic.forum.permissions.length) {
      throw new AccessDeniedError();
    }

    const pagination = await inputPaginationCursor({
      database: forum_posts_timeline,
      databaseService: this.databaseService,
      cursor,
      first: first ?? firstEdges,
      last,
      primaryCursor: {
        order: "ASC",
        key: "id",
        schema: forum_posts_timeline.id
      },
      defaultSortBy: {
        direction:
          sortBy === ShowPostsForumsSortingEnum.newest
            ? SortDirectionEnum.desc
            : SortDirectionEnum.asc,
        column: "created"
      }
    });

    const where = eq(forum_posts_timeline.topic_id, topic_id);

    const edges =
      await this.databaseService.db.query.forum_posts_timeline.findMany({
        ...pagination,
        where: and(pagination.where, where),
        with: {
          post: {
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
          },
          topic_log: {
            with: {
              topic: {
                with: {
                  title: true
                }
              },
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
      .from(forum_posts_timeline)
      .where(where);

    const output = outputPagination({
      edges: edges.map((edge) => {
        if (edge.topic_log) {
          const { id, ...actions } = edge.topic_log;

          return {
            ...edge,
            action_id: id,
            ...actions
          };
        }

        const { id, ...post } = edge.post;

        return {
          ...edge,
          post_id: id,
          ...post
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });

    // Get first edges
    const currentTotalCount = totalCount[0].count;
    const currentFirst = currentTotalCount - firstEdges;
    if (
      output.edges.length &&
      firstEdges &&
      currentTotalCount > firstEdges &&
      currentFirst > 0
    ) {
      const lastEdgesPagination = await inputPaginationCursor({
        database: forum_posts_timeline,
        databaseService: this.databaseService,
        cursor,
        first: currentFirst >= firstEdges ? firstEdges : currentFirst,
        last: null,
        primaryCursor: {
          order: "ASC",
          key: "id",
          schema: forum_posts_timeline.id
        },
        defaultSortBy: {
          direction:
            sortBy === ShowPostsForumsSortingEnum.newest
              ? SortDirectionEnum.asc
              : SortDirectionEnum.desc,
          column: "created"
        }
      });

      const lastEdges =
        await this.databaseService.db.query.forum_posts_timeline.findMany({
          ...lastEdgesPagination,
          where: and(lastEdgesPagination.where, where),
          with: {
            post: {
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
            },
            topic_log: {
              with: {
                topic: {
                  with: {
                    title: true
                  }
                },
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

      return {
        ...output,
        lastEdges: lastEdges.reverse().map((edge) => {
          if (edge.topic_log) {
            const { id, ...actions } = edge.topic_log;

            return {
              ...edge,
              action_id: id,
              ...actions
            };
          }

          const { id, ...post } = edge.post;

          return {
            ...edge,
            post_id: id,
            ...post
          };
        })
      };
    }

    // Get next edges
    return {
      ...output,
      lastEdges: []
    };
  }
}
