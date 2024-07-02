import { Inject, Injectable } from '@nestjs/common';

import { MailService } from '../mail.service';

import { EmailHelpersServiceType } from '../../../../providers/email/email-helpers.type';
import { EmailTemplateProps } from '../../../../providers/email/template/email-template';

interface Args extends Pick<EmailTemplateProps, 'previewText' | 'user'> {
  message: string;
  subject: string;
  to: string;
  from?: string;
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
