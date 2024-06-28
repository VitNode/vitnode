import { DatabaseService } from "@/database/database.service";
import { Injectable } from "@nestjs/common";
import { core_users } from "../../admin/database/schema/users";
import { eq } from "drizzle-orm";
import { core_keys } from "../../admin/database/schema/keys";

@Injectable
export class ResetPasswordCoreMembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async reset_password({
    email
  }: ResetPasswordCoreMembersArgs): Promise<ResetPasswordCoreMembersObj> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.email, email)
    });

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < 32; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const key_exists = Boolean(
      await this.databaseService.db.query.core_keys.findFirst({
        where: eq(core_keys.key, key)
      })
    );
  }
}
