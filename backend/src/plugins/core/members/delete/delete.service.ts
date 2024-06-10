import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { DeleteCoreMembersArgs } from "./dto/delete.args";

import { core_users } from "@/plugins/core/admin/database/schema/users";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class DeleteCoreMembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ id }: DeleteCoreMembersArgs): Promise<string> {
    const [users] = await this.databaseService.db
      .select({
        count: count()
      })
      .from(core_users)
      .where(eq(core_users.id, id));

    if (users.count < 1) return "No user found with the provided id.";

    await this.databaseService.db
      .delete(core_users)
      .where(eq(core_users.id, id));

    return "Success!";
  }
}
