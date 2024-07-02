import { Inject, Injectable } from '@nestjs/common';

import { MailService } from '../mail.service';

import { EmailHelpersServiceType } from '../../../../providers/email/email-helpers.type';

interface Args {
  message: string;
  previewText: string;
  subject: string;
  to: string;
  username: string;
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
    username,
  }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: this.emailHelpersService.template({
        previewText,
        children: message,
        username,
      }),
    });

    return 'Email sent with Message!';
  }
}
