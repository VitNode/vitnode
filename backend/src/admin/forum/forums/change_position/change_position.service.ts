import { Injectable } from "@nestjs/common";
import { eq, isNull } from "drizzle-orm";

import { ChangePositionForumForumsArgs } from "./dto/change_position.args";

import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { forum_forums } from "@/src/admin/forum/database/schema/forums";

@Injectable()
export class ChangePositionForumForumsService {
  constructor(private databaseService: DatabaseService) {}

  async changeOrderingForumForums({
    id,
    index_to_move,
    parent_id
  }: ChangePositionForumForumsArgs) {
    const item = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!item) {
      throw new NotFoundError("Forum");
    }

    const allChildrenParent =
      await this.databaseService.db.query.forum_forums.findMany({
        where: (table, { eq }) =>
          parent_id === null
            ? isNull(table.parent_id)
            : eq(table.parent_id, parent_id),
        orderBy: (table, { asc }) => asc(table.position)
      });

    let index = 0;
    const newChildrenIndexes: { id: number; position: number }[] = [];
    allChildrenParent
      .filter(item => item.id !== id)
      .forEach(item => {
        // Skip the item that we want to move
        if (index_to_move === index) {
          index++;
        }

        newChildrenIndexes.push({
          id: item.id,
          position: index
        });
        index++;
      });

    // If index_to_move is below 0, it means that the item is at the end of the list
    newChildrenIndexes.push({
      id,
      position: index_to_move < 0 ? index : index_to_move
    });

    await Promise.all(
      newChildrenIndexes.map(async item => {
        await this.databaseService.db
          .update(forum_forums)
          .set({
            position: item.position,
            parent_id
          })
          .where(eq(forum_forums.id, item.id));
      })
    );

    return "Success!";
  }
}
