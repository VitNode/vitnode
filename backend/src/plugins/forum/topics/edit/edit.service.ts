import { Injectable } from "@nestjs/common";

import { EditForumTopicsArgs } from "./dto/edit.args";
import { ShowTopicsForums } from "../show/dto/show.obj";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { forum_topics_titles } from "@/plugins/forum/admin/database/schema/topics";
import { forum_posts_content } from "@/plugins/forum/admin/database/schema/posts";
import { StatsShowForumForumsService } from "../../forums/show/stats.service";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";

@Injectable()
export class EditForumTopicsService {
  constructor(
    private databaseService: DatabaseService,
    private statsForumService: StatsShowForumForumsService,
    private parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async edit(
    { content, id, title }: EditForumTopicsArgs,
    user: User
  ): Promise<ShowTopicsForums> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, id),
      with: {
        posts: {
          limit: 1,
          orderBy: (table, { asc }) => asc(table.created)
        }
      }
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    const post = topic.posts.at(0);
    if (post?.user_id !== user.id) {
      throw new AccessDeniedError();
    }

    await this.parserTextLang.parse({
      item_id: id,
      database: forum_topics_titles,
      data: title
    });

    await this.parserTextLang.parse({
      item_id: post.id,
      database: forum_posts_content,
      data: content
    });

    const dataTopic =
      await this.databaseService.db.query.forum_topics.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          title: true,
          forum: {
            with: {
              permissions: {
                where: (table, { eq }) =>
                  eq(table.group_id, user?.group.id ?? 1) // 1 = guest
              }
            }
          },
          posts: {
            limit: 1,
            orderBy: (table, { asc }) => asc(table.created),
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

    const breadcrumbs = await this.statsForumService.breadcrumbs({
      forumId: topic.forum_id
    });

    return {
      ...dataTopic,
      user: dataTopic.posts[0].user,
      content: dataTopic.posts[0].content,
      breadcrumbs,
      permissions: {
        can_reply:
          dataTopic.forum.permissions.at(0)?.can_reply ||
          dataTopic.forum.can_all_reply,
        can_edit: user.id === dataTopic.posts[0].user.id,
        can_download_files:
          dataTopic.forum.permissions.at(0)?.can_download_files ||
          dataTopic.forum.can_all_download_files
      }
    };
  }
}
