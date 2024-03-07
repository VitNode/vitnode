import { Injectable } from "@nestjs/common";

import { CreateForumTopicsArgs } from "./dto/create.args";
import { ShowTopicsForums } from "../show/dto/show.obj";

import { currentDate } from "@/functions/date";
import { User } from "@/utils/decorators/user.decorator";
import { Ctx } from "@/types/context.type";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DatabaseService } from "@/modules/database/database.service";
import {
  forum_topics,
  forum_topics_titles
} from "@/modules/forum/admin/database/schema/topics";
import { CreateForumsPostsService } from "../../posts/create/create.service";
import { StatsShowForumForumsService } from "../../forums/show/stats.service";

@Injectable()
export class CreateForumTopicsService {
  constructor(
    private databaseService: DatabaseService,
    private createPostService: CreateForumsPostsService,
    private statsForumService: StatsShowForumForumsService
  ) {}

  async create(
    user: User,
    { content, forum_id, title }: CreateForumTopicsArgs,
    { req, res }: Ctx
  ): Promise<ShowTopicsForums> {
    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, forum_id),
      with: {
        permissions: {
          where: (table, { eq }) => eq(table.group_id, user.group.id)
        }
      }
    });

    if (!(forum.permissions.at(0)?.can_create || forum.can_all_create)) {
      throw new AccessDeniedError();
    }

    const data = await this.databaseService.db
      .insert(forum_topics)
      .values({
        ip_address: req.ip,
        created: currentDate(),
        forum_id
      })
      .returning();

    // Create title
    await this.databaseService.db.insert(forum_topics_titles).values(
      title.map(item => ({
        ...item,
        topic_id: data[0].id
      }))
    );

    // Create first post
    const post = await this.createPostService.create(
      user,
      { content, topic_id: data[0].id },
      { req, res },
      true // Skip timeline
    );

    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, data[0].id),
      with: {
        title: true,
        forum: {
          with: {
            permissions: {
              where: (table, { eq }) => eq(table.group_id, user?.group.id ?? 1) // 1 = guest
            }
          }
        }
      }
    });

    const breadcrumbs = await this.statsForumService.breadcrumbs({
      forumId: topic.forum_id
    });

    return {
      ...topic,
      user: post.user,
      content: post.content,
      breadcrumbs,
      permissions: {
        can_reply:
          topic.forum.permissions.at(0)?.can_reply || topic.forum.can_all_reply,
        can_edit: user.id === post.user.id
      }
    };
  }
}
