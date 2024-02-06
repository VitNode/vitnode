import { Injectable } from "@nestjs/common";

import { ShowAdminGroups } from "../show/dto/show.obj";
import { CreateAdminGroupsArgs } from "./dto/create.args";

import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { DatabaseService } from "@/database/database.service";
import {
  core_groups,
  core_groups_names
} from "@/src/admin/core/database/schema/groups";

@Injectable()
export class CreateAdminGroupsService {
  constructor(private databaseService: DatabaseService) {}

  async create({ name }: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    const transformName = name.filter(item => item.value.trim().length > 0);

    if (!transformName.length) {
      throw new CustomError({
        code: "BAD_REQUEST",
        message: "Name is required"
      });
    }

    const group = await this.databaseService.db
      .insert(core_groups)
      .values({
        created: currentDate(),
        updated: currentDate()
      })
      .returning();

    const groupNames = await this.databaseService.db
      .insert(core_groups_names)
      .values(
        transformName.map(item => ({
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
