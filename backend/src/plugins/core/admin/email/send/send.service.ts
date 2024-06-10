import { Injectable } from "@nestjs/common";

import { MailService } from "../mail.service";
import EmailTemplate from "../emails/email-template";

interface Args {
  from: string;
  message: string;
  subject: string;
  to: string;
}

@Injectable()
export class SendAdminEmailService {
  constructor(private readonly mailService: MailService) {}

  async send({ to, from, subject, message }: Args): Promise<string> {
    await this.mailService.sendMail({
      to,
      subject,
      template: EmailTemplate({ previewText: "test", children: message })
    });

    return "Email sent with Message!";
  }
}
