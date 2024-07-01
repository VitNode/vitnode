import { Injectable } from "@nestjs/common";

import { MailService } from "../mail.service";
import { EmailTemplate } from "../emails/email-template";

interface Args {
  message: string;
  subject: string;
  to: string;
}

@Injectable()
export class SendAdminEmailService {
  constructor(private readonly mailService: MailService) {}

  async send({ to, subject, message }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: EmailTemplate({ previewText: "test", children: message })
    });

    return "Email sent with Message!";
  }
}
