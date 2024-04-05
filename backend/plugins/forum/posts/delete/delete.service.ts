import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { User } from "@/utils/decorators/user.decorator";
import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DeletePostsForumsArgs } from "@/plugins/forum/posts/delete/dto/delete.args";
import { DatabaseService } from "@/plugins/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class DeleteForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

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

    await this.databaseService.db
      .delete(forum_posts)
      .where(eq(forum_posts.id, id))
      .execute();

    return "Success!";
  }
}
