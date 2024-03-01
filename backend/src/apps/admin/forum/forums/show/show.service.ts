import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowForumForumsAdminObj } from "./dto/show.obj";

import { DatabaseService } from "@/database/database.service";
import { outputPagination } from "@/functions/database/pagination";
import { forum_forums } from "@/apps/admin/forum/database/schema/forums";
import { ShowForumForumsService } from "@/apps/forum/forums/show/show.service";
import { ShowForumForumsArgs } from "@/apps/forum/forums/show/dto/show.args";

@Injectable()
export class ShowForumForumsAdminService {
  constructor(
    private databaseService: DatabaseService,
    private forumService: ShowForumForumsService
  ) {}

  async show({
    cursor,
    first,
    last,
    search,
    ...rest
  }: ShowForumForumsArgs): Promise<ShowForumForumsAdminObj> {
    const { edges, searchIds, where } = await this.forumService.getData(
      {
        cursor,
        first,
        last,
        search,
        isAdmin: true,
        ...rest
      },
      null
    );

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_forums)
      .where(where);

    return outputPagination({
      edges:
        search && searchIds.length === 0
          ? []
          : edges.map(edge => ({
              ...edge,
              permissions: {
                can_all_create: edge.can_all_create,
                can_all_read: edge.can_all_read,
                can_all_reply: edge.can_all_reply,
                can_all_view: edge.can_all_view,
                groups: edge.permissions
              }
            })),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
