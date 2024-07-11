import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';

import { DatabaseService } from '@/utils/database/database.service';
import { User } from '@/decorators';
import { encryptPassword } from '@/core/sessions/encrypt_password';
import {
  core_users,
  core_users_pass_reset,
} from '@/plugins/core/admin/database/schema/users';

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async change_password({
    hashKey,
    password,
  }: ChangePasswordCoreMembersArgs): Promise<User> {
    const keyData =
      await this.databaseService.db.query.core_users_pass_reset.findFirst({
        where: eq(core_users_pass_reset.key, hashKey),
      });

    const id = keyData.user_id;
    const hashPassword = await encryptPassword(this.configService, password);

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
