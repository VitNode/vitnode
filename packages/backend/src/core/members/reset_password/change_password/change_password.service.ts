import { encryptPassword } from '@/core/sessions/password';
import { core_users, core_users_pass_reset } from '@/database/schema/users';
import { InternalServerError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async change_password({
    hashKey,
    password,
  }: ChangePasswordCoreMembersArgs): Promise<string> {
    const keyData =
      await this.databaseService.db.query.core_users_pass_reset.findFirst({
        where: eq(core_users_pass_reset.key, hashKey),
      });

    if (!keyData) {
      throw new InternalServerError();
    }

    const id = keyData.user_id;
    const hashPassword = await encryptPassword(password);

    await this.databaseService.db
      .update(core_users)
      .set({
        password: hashPassword,
      })
      .where(eq(core_users.id, id));

    return 'Success!';
  }
}
