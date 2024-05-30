import { Injectable } from "@nestjs/common";

import { CreatePostsForumsArgs } from "@/plugins/forum/posts/create/dto/create.args";
import { ShowPostsForums } from "@/plugins/forum/posts/show/dto/show.obj";
import { User } from "@/utils/decorators/user.decorator";
import {
  forum_posts,
  forum_posts_content
} from "@/plugins/forum/admin/database/schema/posts";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";
import { Ctx } from "@/utils/types/context.type";
import { getUserIp } from "@/functions/get-user-ip";

@Injectable()
export class CreateForumsPostsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async create(
    { id }: User,
    { content, topic_id }: CreatePostsForumsArgs,
    { req }: Ctx
  ): Promise<ShowPostsForums> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, topic_id)
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    const createPost = await this.databaseService.db
      .insert(forum_posts)
      .values({
        ip_address: getUserIp(req),
        topic_id,
        user_id: id
      })
      .returning();

    const post = createPost[0];

    // Post content
    await this.parserTextLang.parse({
      item_id: post.id,
      database: forum_posts_content,
      data: content
    });

    const data = await this.databaseService.db.query.forum_posts.findFirst({
      where: (table, { eq }) => eq(table.id, post.id),
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
    });

    return {
      post_id: post.id,
      ...data
    };
  }
}
