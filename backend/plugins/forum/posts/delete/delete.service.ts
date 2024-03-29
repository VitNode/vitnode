import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { DatabaseService } from "@/plugins/database/database.service";
import { DeletePostsForumsArgs } from "./dto/delete.args";
import { forum_posts } from "../../admin/database/schema/posts";

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
