import { SendAdminEmailService } from '@/core/admin/email/send/send.service';
import { EmailHelpersServiceType, getTranslationForEmail } from '@/providers';
import { Inject, Injectable } from '@nestjs/common';

import { ConfirmEmailTemplate } from './confirm_email.email';

@Injectable()
export class SendConfirmEmailCoreSessionsService {
  constructor(
    private readonly mailService: SendAdminEmailService,
    @Inject('EmailHelpersService')
    private readonly emailHelpersService: EmailHelpersServiceType,
  ) {}

  async sendConfirmEmail({
    user,
  }: {
    user: { email: string; id: number; language: string; name: string };
  }) {
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
        token: 'test_token',
      }),
      previewText: t('preview'),
      user,
    });
  }
}
