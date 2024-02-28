import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteForumForumsArgs } from "./dto/delete.args";

import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { CustomError } from "@/utils/errors/CustomError";
import { forum_forums } from "../../database/schema/forums";
import { forum_topics } from "../../database/schema/topics";

@Injectable()
export class DeleteForumForumsService {
  constructor(private databaseService: DatabaseService) {}

  async delete({
    id,
    move_forums_to,
    move_topics_to
  }: DeleteForumForumsArgs): Promise<string> {
    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!forum) {
      throw new NotFoundError("Forum");
    }

    const children = await this.databaseService.db.query.forum_forums.findMany({
      where: (table, { eq }) => eq(table.parent_id, id)
    });

    if (children.length > 0) {
      if (!move_forums_to) {
        throw new CustomError({
          code: "FORUM_HAS_CHILDREN",
          message: "Forum has children and no move_forums_to provided"
        });
      }

      const moveForumsToForum =
        await this.databaseService.db.query.forum_forums.findFirst({
          where: (table, { eq }) => eq(table.id, move_forums_to)
        });

      if (!moveForumsToForum) {
        throw new NotFoundError("Forum");
      }

      await this.databaseService.db
        .update(forum_forums)
        .set({
          parent_id: move_forums_to
        })
        .where(eq(forum_forums.parent_id, id));
    }

    const topics = await this.databaseService.db.query.forum_topics.findMany({
      where: (table, { eq }) => eq(table.forum_id, id)
    });

    if (topics.length > 0) {
      if (!move_topics_to) {
        throw new CustomError({
          code: "FORUM_HAS_TOPICS",
          message: "Forum has topics and no move_topics_to provided"
        });
      }

      const moveTopicsToForum =
        await this.databaseService.db.query.forum_forums.findFirst({
          where: (table, { eq }) => eq(table.id, move_topics_to)
        });

      if (!moveTopicsToForum) {
        throw new NotFoundError("Forum");
      }

      await this.databaseService.db
        .update(forum_topics)
        .set({
          forum_id: move_topics_to
        })
        .where(eq(forum_topics.forum_id, id));
    }

    await this.databaseService.db
      .delete(forum_forums)
      .where(eq(forum_forums.id, id));

    return "Success!";
  }
}
