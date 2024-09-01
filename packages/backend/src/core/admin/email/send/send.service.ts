import { EmailHelpersServiceType } from '@/providers/email/email-helpers.type';
import { EmailTemplateProps } from '@/providers/email/template/email-template';
import { Inject, Injectable } from '@nestjs/common';
import React from 'react';

import { MailService } from '../mail.service';

interface Args extends Pick<EmailTemplateProps, 'preview_text' | 'user'> {
  from?: string;
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
  ) {}

  async send({
    to,
    from,
    subject,
    message,
    preview_text,
    user,
  }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: this.emailHelpersService.template({
        preview_text,
        children: message,
        user,
      }),
    });

    return 'Email sent with Message!';
  }
}
