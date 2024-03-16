import { Injectable } from "@nestjs/common";

import { ShowAdminGroups } from "../show/dto/show.obj";
import { CreateAdminGroupsArgs } from "./dto/create.args";

import { DatabaseService } from "@/modules/database/database.service";
import {
  core_groups,
  core_groups_names
} from "@/modules/core/admin/database/schema/groups";

@Injectable()
export class CreateAdminGroupsService {
  constructor(private databaseService: DatabaseService) {}

  async create({ name }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const group = await this.databaseService.db
      .insert(core_groups)
      .values({})
      .returning();

    const groupNames = await this.databaseService.db
      .insert(core_groups_names)
      .values(
        name.map(item => ({
          group_id: group[0].id,
          language_code: item.language_code,
          value: item.value
        }))
      )
      .returning();

    return {
      ...group[0],
      name: groupNames,
      users_count: 0
    };
  }
}
