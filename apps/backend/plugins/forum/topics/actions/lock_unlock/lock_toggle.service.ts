import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { Ctx } from "@/types/context.type";
import { User } from "@/utils/decorators/user.decorator";
import { LockToggleForumTopicsArgs } from "@/plugins/forum/topics/actions/lock_unlock/dto/lock_toggle.args";
import { DatabaseService } from "@/plugins/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import {
  forum_topics,
  forum_topics_logs
} from "@/plugins/forum/admin/database/schema/topics";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";

@Injectable()
export class LockToggleForumTopicsService {
  constructor(private databaseService: DatabaseService) {}

  async lockToggle(
    { group, id: user_id }: User,
    { id }: LockToggleForumTopicsArgs,
    { req }: Ctx
  ): Promise<boolean> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    // Check permissions
    const permissions =
      await this.databaseService.db.query.core_moderators_permissions.findFirst(
        {
          where: (table, { and, eq, or }) =>
            and(
              or(eq(table.user_id, user_id), eq(table.group_id, group.id)),
              eq(table.unrestricted, true)
            )
        }
      );

    if (!permissions) {
      throw new AccessDeniedError();
    }

    // Update topic
    await this.databaseService.db
      .update(forum_topics)
      .set({
        locked: !topic.locked
      })
      .where(eq(forum_topics.id, id));

    // Create log
    await this.databaseService.db
      .insert(forum_topics_logs)
      .values({
        topic_id: topic.id,
        user_id,
        action: topic.locked ? "unlock" : "lock",
        ip_address: req.ip
      })
      .returning();

    return !topic.locked;
  }
}
