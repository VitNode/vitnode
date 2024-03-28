import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { User } from "@/utils/decorators/user.decorator";
import { DatabaseService } from "@/modules/database/database.service";
import { forum_posts } from "@/modules/forum/admin/database/schema/posts";
import { DeletePostsForumsArgs } from "@/modules/forum/posts/delete/dto/delete.args";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { NotFoundError } from "@/utils/errors/not-found-error";

@Injectable()
export class DeleteForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

  async delete(user: User, { id }: DeletePostsForumsArgs): Promise<string> {
    const { post_id } =
      await this.databaseService.db.query.forum_posts_timeline.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        columns: {
          post_id: true
        }
      });

    const post = await this.databaseService.db.query.forum_posts.findFirst({
      where: (table, { eq }) => eq(table.id, post_id)
    });

    if (!post) throw new NotFoundError("Post");
    if (user.id !== post.user_id) throw new AccessDeniedError();

    await this.databaseService.db
      .delete(forum_posts)
      .where(eq(forum_posts.id, post_id))
      .execute();

    return "Success!";
  }
}
