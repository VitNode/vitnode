import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";
import { NotFoundError, DatabaseService } from "vitnode-backend";

import { EditAdminGroupsArgs } from "./dto/edit.args";
import { ShowAdminGroups } from "../show/dto/show.obj";

import {
  core_groups,
  core_groups_names
} from "@/plugins/core/admin/database/schema/groups";
import { core_users } from "@/plugins/core/admin/database/schema/users";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";

@Injectable()
export class EditAdminGroupsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async edit({
    content,
    id,
    name
  }: EditAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db.query.core_groups.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!group) {
      throw new NotFoundError("Group");
    }

    await this.parserTextLang.parse({
      item_id: id,
      database: core_groups_names,
      data: name
    });

    const usersCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(eq(core_users.group_id, id));

    await this.databaseService.db
      .update(core_groups)
      .set({
        updated: new Date(),
        ...content
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
      ...updateGroup,
      content
    };
  }
}
