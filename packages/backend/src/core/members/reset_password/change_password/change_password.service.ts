import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';

import { DatabaseService } from '@/utils/database/database.service';
import { User } from '@/decorators';
import { encryptPassword } from '@/core/sessions/password';
import { core_users, core_users_pass_reset } from '@/database/schema/users';

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async change_password({
    hashKey,
    password,
  }: ChangePasswordCoreMembersArgs): Promise<User> {
    const keyData =
      await this.databaseService.db.query.core_users_pass_reset.findFirst({
        where: eq(core_users_pass_reset.key, hashKey),
      });

    const id = keyData.user_id;
    const hashPassword = await encryptPassword(password);

    const update = await this.databaseService.db
      .update(core_users)
      .set({
        password: hashPassword,
      })
      .where(eq(core_users.id, id))
      .returning();

    return {
      ...update[0],
      avatar: null,
      group: null,
    };
  }
}
