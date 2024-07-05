import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';
import { core_users_pass_reset } from '@/templates/core/admin/database/schema/users';
import { DatabaseService } from '@/database';
import { setPassword } from '@/core/sessions/set_password';

@Injectable()
export class ChangePasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async change_password({
    key,
    password,
  }: ChangePasswordCoreMembersArgs): Promise<string> {
    const keyData =
      await this.databaseService.db.query.core_users_pass_reset.findFirst({
        where: eq(core_users_pass_reset.key, key),
      });

    const id = keyData.user_id;
    setPassword(this.databaseService, this.configService, id, password);
    return "Success!";
  }
}
