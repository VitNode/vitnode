import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { User } from "@/utils/decorators/user.decorator";
import { DatabaseService } from "@/modules/database/database.service";
import { forum_posts } from "@/modules/forum/admin/database/schema/posts";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { DeletePostsForumsArgs } from "@/modules/forum/posts/delete/dto/delete.args";

@Injectable()
export class DeleteForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

  async delete(
    { id }: User,
    { post_id }: DeletePostsForumsArgs
  ): Promise<string> {
    const user_id = await this.databaseService.db
      .select({
        user_id: forum_posts.user_id
      })
      .from(forum_posts)
      .where(eq(forum_posts.id, post_id))[0]?.user_id;

    if (user_id === id) {
      await this.databaseService.db
        .delete(forum_posts)
        .where(eq(forum_posts.id, post_id))
        .execute();

      return "Success!";
    }
    throw new AccessDeniedError();
  }
}
