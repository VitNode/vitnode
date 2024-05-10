import { Injectable } from "@nestjs/common";

import { CreateForumTopicsArgs } from "./dto/create.args";
import { ShowTopicsForums } from "../show/dto/show.obj";

import { User } from "@/utils/decorators/user.decorator";
import { Ctx } from "@/types/context.type";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DatabaseService } from "@/plugins/database/database.service";
import {
  forum_topics,
  forum_topics_titles
} from "@/plugins/forum/admin/database/schema/topics";
import { CreateForumsPostsService } from "../../posts/create/create.service";
import { StatsShowForumForumsService } from "../../forums/show/stats.service";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";

@Injectable()
export class CreateForumTopicsService {
  constructor(
    private databaseService: DatabaseService,
    private createPostService: CreateForumsPostsService,
    private statsForumService: StatsShowForumForumsService,
    private parserTextLang: ParserTextLanguageCoreHelpersService
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
        forum_id
      })
      .returning();

    // Create title
    await this.parserTextLang.parse({
      item_id: data[0].id,
      database: forum_topics_titles,
      data: title
    });

    // Create first post
    const post = await this.createPostService.create(
      user,
      { content, topic_id: data[0].id },
      { req, res }
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
        can_edit: user.id === post.user.id,
        can_download_files:
          topic.forum.permissions.at(0)?.can_download_files ||
          topic.forum.can_all_download_files
      }
    };
  }
}
