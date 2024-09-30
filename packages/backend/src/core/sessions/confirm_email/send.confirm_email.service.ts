import { SendAdminEmailService } from '@/core/admin/email/send/send.service';
import { core_users_confirm_emails } from '@/database/schema/users';
import { CustomError, NotFoundError } from '@/errors';
import { EmailHelpersServiceType, getTranslationForEmail } from '@/providers';
import { InternalDatabaseService } from '@/utils';
import { Inject, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

import { ConfirmEmailTemplate } from './confirm_email.email';

@Injectable()
export class SendConfirmEmailCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly mailService: SendAdminEmailService,
    @Inject('EmailHelpersService')
    private readonly emailHelpersService: EmailHelpersServiceType,
  ) {}

  private async encryptToken(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(4).toString('hex');

      crypto.scrypt(email, salt, 32, (err, derivedKey) => {
        if (err) reject(err);

        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  async sendConfirmEmail({ userId }: { userId: number }) {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, userId),
      columns: {
        id: true,
        email: true,
        language: true,
        name: true,
        email_verified: true,
      },
      with: {
        confirm_email: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    if (user.email_verified) {
      throw new CustomError({
        code: 'EMAIL_ALREADY_VERIFIED',
        message: 'Email already verified',
      });
    }

    // If user has confirm email, delete it
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (user.confirm_email?.id) {
      // Skip if email was sent less than 10 minutes ago
      if (user.confirm_email.created > new Date(Date.now() - 1000 * 60 * 10)) {
        return;
      }

      await this.databaseService.db
        .delete(core_users_confirm_emails)
        .where(eq(core_users_confirm_emails.id, user.confirm_email.id));
    }

    // Hash token
    const hashToken = await this.encryptToken(user.id.toString());

    // Save token
    await this.databaseService.db.insert(core_users_confirm_emails).values({
      user_id: user.id,
      token: hashToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours
    });

    // Send email
    const t = getTranslationForEmail(
      'core.sign_up.confirm_email.mail',
      user.language,
    );
    await this.mailService.send({
      to: user.email,
      subject: t('subject'),
      message: ConfirmEmailTemplate({
        user,
        helpers: this.emailHelpersService.getHelpersForEmail(),
        token: hashToken,
      }),
      previewText: t('preview'),
      user,
    });
  }
}
