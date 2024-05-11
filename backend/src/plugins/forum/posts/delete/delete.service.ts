import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { User } from "@/utils/decorators/user.decorator";
import {
  forum_posts,
  forum_posts_content
} from "@/plugins/forum/admin/database/schema/posts";
import { DeletePostsForumsArgs } from "@/plugins/forum/posts/delete/dto/delete.args";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";
import { CustomError } from "@/utils/errors/custom-error";

@Injectable()
export class DeleteForumsPostsService {
  constructor(
    private databaseService: DatabaseService,
    private parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async delete(user: User, { id }: DeletePostsForumsArgs): Promise<string> {
    const post = await this.databaseService.db.query.forum_posts.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!post) throw new NotFoundError("Post");
    if (user.id !== post.user_id) throw new AccessDeniedError();

    // Check if it's the first post
    const firstPost = await this.databaseService.db.query.forum_posts.findFirst(
      {
        where: (table, { eq }) => eq(table.topic_id, post.topic_id),
        orderBy: (table, { asc }) => asc(table.created)
      }
    );

    if (firstPost.id === post.id) {
      throw new CustomError({
        code: "FORUM_POSTS_DELETE_FIRST_POST",
        message: "You can't delete the first post of a topic"
      });
    }

    await this.parserTextLang.delete({
      database: forum_posts_content,
      item_id: post.id
    });

    await this.databaseService.db
      .delete(forum_posts)
      .where(eq(forum_posts.id, id))
      .execute();

    return "Success!";
  }
}
