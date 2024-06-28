import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { core_keys } from '@/templates/core/admin/database/schema/keys';
import { core_users } from '@/templates/core/admin/database/schema/users';

import { SendAdminEmailService } from '../../admin/email/send/send.service';
import { ResetPasswordCoreMembersArgs } from './dto/reset_password.args';

@Injectable()
export class ResetPasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: SendAdminEmailService,
  ) {}

  async reset_password({
    email,
  }: ResetPasswordCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.email, email),
    });

    if (user == undefined) return 'No such email found!';

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key;

    do {
      key = '';
      for (let i = 0; i < 32; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (
      Boolean(
        await this.databaseService.db.query.core_keys.findFirst({
          where: eq(core_keys.key, key),
        }),
      )
    );

    await this.databaseService.db.insert(core_keys).values({
      user_id: user.id,
      key: key,
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
