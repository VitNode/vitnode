import { Inject, Injectable } from '@nestjs/common';
// import { generateRandomString } from 'vitnode-shared';

import { CreateKeyResetPasswordCoreMembersArgs } from './dto/create_key.args';
import { ContentCreateKeyEmail } from './_email/content';

import { DatabaseService } from '@/utils/database/database.service';
import { NotFoundError } from '@/errors';
// import { core_users_pass_reset } from '@/plugins/core/admin/database/schema/users';
import { SendAdminEmailService } from '../../../admin/email/send/send.service';
import { EmailHelpersServiceType, getTranslationForEmail } from '@/providers';

@Injectable()
export class CreateKeyResetPasswordCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailService: SendAdminEmailService,
    @Inject('EmailHelpersService')
    private readonly emailHelpersService: EmailHelpersServiceType,
  ) {}

  async create_key({
    email,
  }: CreateKeyResetPasswordCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    // const key = generateRandomString(32);
    // const keySalt = await genSalt(
    //   this.configService.getOrThrow('password_reset_salt'),
    // );
    // const hashKey = await hash(key, keySalt);
    // await this.databaseService.db.insert(core_users_pass_reset).values({
    //   user_id: user.id,
    //   key: hashKey,
    //   expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    // });

    const t = getTranslationForEmail('core.reset_password', user.language);

    await this.mailService.send({
      to: user.email,
      subject: t('title'),
      message: ContentCreateKeyEmail({
        language: user.language,
        helpers: this.emailHelpersService.getHelpersForEmail(),
        key: '',
      }),
      preview_text: t('preview_text'),
      user,
    });

    return 'Success!';
  }
}
