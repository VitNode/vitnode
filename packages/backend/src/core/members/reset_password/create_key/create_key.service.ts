import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { generateRandomString } from 'vitnode-shared';
import { ConfigService } from '@nestjs/config';

import { CreateKeyResetPasswordCoreMembersArgs } from './dto/create_key.args';

import { DatabaseService } from '../../../../database/database.service';
import { NotFoundError } from '../../../../errors';
import { core_users_pass_reset } from '../../../../templates/core/admin/database/schema/users';
import { SendAdminEmailService } from '../../../admin/email/send/send.service';

@Injectable()
export class CreateKeyResetPasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
    private readonly mailService: SendAdminEmailService,
  ) {}

  async create_key({
    email,
  }: CreateKeyResetPasswordCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const key = generateRandomString(32);
    const keySalt = await genSalt(
      this.configService.getOrThrow('password_reset_salt'),
    );
    const hashPassword = await hash(key, keySalt);
    await this.databaseService.db.insert(core_users_pass_reset).values({
      user_id: user.id,
      key: hashPassword,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    const message = `Hello ${user.first_name} ${user.last_name},\n\n
    To confirm your password reset, go to https://vitnode.com/?key=${key}.\n\n
    In most email programs, the address sent should work as an active link that can be clicked. If the link does not work, copy and paste it into the address bar of your browser (preferably Chrome or Opera).\n\n
    Best regards!\n
    VitNode Team`;

    const emailData = {
      to: user.email,
      subject: 'VitNode.com - password reset request',
      message: message,
    };

    await this.mailService.send(emailData);

    return 'Success!';
  }
}
