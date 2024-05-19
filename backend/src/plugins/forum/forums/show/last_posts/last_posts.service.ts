import { Injectable } from "@nestjs/common";
import { and, count, inArray } from "drizzle-orm";

import { LastPostsShowForumForumsArgs } from "./dto/last_posts.args";
import { LastPostsShowForumForumsObj } from "./dto/last_posts.obj";

import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { DatabaseService } from "@/database/database.service";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";

interface Args extends LastPostsShowForumForumsArgs {
  topicIds: number[];
}

@Injectable()
export class LastPostsForumForumsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async lastPosts({
    cursor,
    first,
    last,
    sortBy,
    topicIds
  }: Args): Promise<LastPostsShowForumForumsObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_posts,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: forum_posts.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      },
      sortBy
    });

    const where =
      topicIds.length > 0 ? inArray(forum_posts.topic_id, topicIds) : undefined;

    const edges = await this.databaseService.db.query.forum_posts.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        topic: {
          with: {
            title: true
          }
        },
        user: {
          with: {
            group: {
              with: {
                name: true
              }
            },
            avatar: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_posts)
      .where(where);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
