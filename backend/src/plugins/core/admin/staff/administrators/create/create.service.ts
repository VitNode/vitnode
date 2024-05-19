import { Injectable } from "@nestjs/common";

import { ShowAdminStaffAdministrators } from "../show/dto/show.obj";
import { CreateAdminStaffAdministratorsArgs } from "./dto/create.args";

import { core_admin_permissions } from "@/plugins/core/admin/database/schema/admins";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";

@Injectable()
export class CreateAdminStaffAdministratorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({
    group_id,
    unrestricted,
    user_id
  }: CreateAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministrators> {
    if (!group_id && !user_id) {
      throw new CustomError({
        code: "BAD_REQUEST",
        message: "You must provide either a group_id or a user_id."
      });
    }

    const findPermission =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq, or }) =>
          or(eq(table.user_id, user_id), eq(table.group_id, group_id))
      });

    if (findPermission) {
      throw new CustomError({
        code: "ALREADY_EXISTS",
        message: "This user or group already has moderator permissions."
      });
    }

    const permission = await this.databaseService.db
      .insert(core_admin_permissions)
      .values({
        user_id,
        group_id,
        unrestricted
      })
      .returning();

    const data =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq }) => eq(table.id, permission[0].id),
        with: {
          user: {
            with: {
              avatar: true,
              group: {
                with: {
                  name: true
                }
              }
            }
          },
          group: {
            with: {
              name: true
            }
          }
        }
      });

    if (data.user) {
      return {
        ...data,
        user_or_group: {
          ...data.user
        }
      };
    }

    return {
      ...data,
      user_or_group: {
        ...data.group,
        group_name: data.group.name
      }
    };
  }
}
