import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { User } from "@/utils/decorators/user.decorator";
import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DeletePostsForumsArgs } from "@/plugins/forum/posts/delete/dto/delete.args";
import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class DeleteForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

  async delete(
    { id }: User,
    { post_id }: DeletePostsForumsArgs
  ): Promise<string> {
    const post = await this.databaseService.db
      .query(forum_posts)
      .where(eq(forum_posts.id, post_id))
      .select(forum_posts.user_id)
      .findOne();

    if (post.user_id === id) {
      await this.databaseService.db
        .delete(forum_posts)
        .where(eq(forum_posts.id, post_id))
        .execute();

      return "Success!";
    }
    throw new AccessDeniedError();
  }
}
