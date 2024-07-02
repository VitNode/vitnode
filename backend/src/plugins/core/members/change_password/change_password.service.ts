import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DatabaseService } from "@/database/database.service";
import { core_users } from "../../admin/database/schema/users";
import { core_keys } from "../../admin/database/schema/keys";
import { ChangePasswordCoreMembersArgs } from "./dto/change_password.args";
import { ChangePasswordCoreMembersObj } from "./dto/change_password.obj";
<<<<<<< HEAD
import { genSalt, hash } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}
=======

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(private readonly databaseService: DatabaseService) {}
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)

  async change_password({
    key,
    password
  }: ChangePasswordCoreMembersArgs): Promise<ChangePasswordCoreMembersObj> {
    const keyData = await this.databaseService.db.query.core_keys.findFirst({
      where: eq(core_keys.key, key)
    });

    const id = keyData.user_id;
<<<<<<< HEAD
    const passwordSalt = await genSalt(
      this.configService.getOrThrow("password_salt")
    );
    const hashPassword = await hash(password, passwordSalt);
=======
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)

    const update = await this.databaseService.db
      .update(core_users)
      .set({
<<<<<<< HEAD
        password: hashPassword
=======
        password: password
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)
      })
      .where(eq(core_users.id, id))
      .returning();

    return update[0];
  }
}
