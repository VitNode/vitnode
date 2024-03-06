import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { EditAdminGroupsArgs } from "./dto/edit.args";
import { ShowAdminGroups } from "../show/dto/show.obj";

import { currentDate } from "@/functions/date";
import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import {
  core_groups,
  core_groups_names
} from "@/src/apps/admin/core/database/schema/groups";
import { core_users } from "@/src/apps/admin/core/database/schema/users";

@Injectable()
export class EditAdminGroupsService {
  constructor(private databaseService: DatabaseService) {}

  async edit({ id, name }: EditAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db.query.core_groups.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!group) {
      throw new NotFoundError("Group");
    }

    const groupNames =
      await this.databaseService.db.query.core_groups_names.findMany({
        where: (table, { eq }) => eq(table.group_id, id)
      });

    // Update name languages
    const updatedName = await Promise.all(
      name.map(async item => {
        const nameExist = groupNames.find(
          name => name.language_code === item.language_code
        );

        if (nameExist) {
          // If value is empty, do nothing
          if (!nameExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(core_groups_names)
            .set({
              value: item.value
            })
            .where(eq(core_groups_names.id, nameExist.id))
            .returning();

          return update[0];
        }

        const update = await this.databaseService.db
          .insert(core_groups_names)
          .values({
            group_id: id,
            language_code: item.language_code,
            value: item.value
          })
          .returning();

        return update[0];
      })
    );

    // Check remaining languages
    Promise.all(
      groupNames.map(async item => {
        const nameExist = updatedName.find(name => name.id === item.id);
        if (nameExist) return;

        await this.databaseService.db
          .delete(core_groups_names)
          .where(eq(core_groups_names.id, item.id));
      })
    );

    const usersCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(eq(core_users.group_id, id));

    await this.databaseService.db
      .update(core_groups)
      .set({
        updated: currentDate()
      })
      .where(eq(core_groups.id, id))
      .returning();

    const updateGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          name: true
        }
      });

    return {
      users_count: usersCount[0].count,
      ...updateGroup
    };
  }
}
