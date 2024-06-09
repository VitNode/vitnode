import { Injectable } from "@nestjs/common";
import * as React from "react";

import { MailService } from "../mail.service";
import { VercelInviteUserEmail } from "../templates/email";

interface SendAdminEmailServiceArgs {
  from: string;
  subject: string;
  to: string;
}

interface SendAdminEmailServiceArgsWithMessage
  extends SendAdminEmailServiceArgs {
  message: string;
  html?: never;
}

interface SendAdminEmailServiceArgsWithHtml extends SendAdminEmailServiceArgs {
  html: React.ReactNode;
  message?: never;
}

@Injectable()
export class SendAdminEmailService {
  constructor(private readonly mailService: MailService) {}

  async send({
    to,
    from,
    subject,
    message,
    html
  }:
    | SendAdminEmailServiceArgsWithHtml
    | SendAdminEmailServiceArgsWithMessage): Promise<string> {
    if (html) {
      await this.mailService.sendMail({
        to,
        subject,
        template: VercelInviteUserEmail({})
      });

      return "";
    }

    return "Email sent with Message!";
  }
}
