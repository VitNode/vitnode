import { EmailHelpersServiceType } from '@/providers/email/email-helpers.type';
import { EmailTemplateProps } from '@/providers/email/template/email-template';
import { Inject, Injectable } from '@nestjs/common';
import React from 'react';

import { MailService } from '../mail.service';

interface Args extends Pick<EmailTemplateProps, 'previewText' | 'user'> {
  message: React.JSX.Element | string;
  subject: string;
  to: string;
}

@Injectable()
export class SendAdminEmailService {
  constructor(
    private readonly mailService: MailService,
    @Inject('EmailHelpersService')
    private readonly emailHelpersService: EmailHelpersServiceType,
    @Inject('VITNODE_EMAIL_SENDER_IS_ENABLED')
    private readonly isEmailEnabled: boolean,
  ) {}

  checkIfEnable(): boolean {
    return this.isEmailEnabled;
  }

  async send({
    to,
    subject,
    message,
    previewText,
    user,
  }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: this.emailHelpersService.template({
        previewText,
        children: message,
        user,
      }),
    });

    return 'Email sent with Message!';
  }
}
