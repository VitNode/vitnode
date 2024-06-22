import { Inject, Injectable } from "@nestjs/common";

import { MailService } from "../mail.service";
import { EmailHelpersServiceType } from "../../../../providers/email/email-helpers.type";

interface Args {
  message: string;
  subject: string;
  to: string;
}

@Injectable()
export class SendAdminEmailService {
  constructor(
    private readonly mailService: MailService,
    @Inject("EmailHelpersService")
    private readonly emailHelpersService: EmailHelpersServiceType
  ) {}

  async send({ to, subject, message }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: this.emailHelpersService.template({
        previewText: "test",
        children: message
      })
    });

    return "Email sent with Message!";
  }
}
