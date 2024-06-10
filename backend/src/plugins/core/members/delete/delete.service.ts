import { Injectable } from "@nestjs/common";
import { and, eq, or } from "drizzle-orm";

import { DeleteCoreMembersArgs } from "./dto/delete.args";

import { core_users } from "@/plugins/core/admin/database/schema/users";
import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_admin_permissions } from "../../admin/database/schema/admins";
import { AccessDeniedError } from "@/utils/errors/access-denied-error";

@Injectable()
export class DeleteCoreMembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ id }: DeleteCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.id, id)
    });

    if (!user) throw new NotFoundError("No user found with the provided id.");

    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: or(
          eq(core_admin_permissions.user_id, user.id),
          eq(core_admin_permissions.group_id, user.group_id)
        )
      });

    if (admin) throw new AccessDeniedError();

    await this.databaseService.db
      .delete(core_users)
      .where(eq(core_users.id, id));

    return "Success!";
  }
}
