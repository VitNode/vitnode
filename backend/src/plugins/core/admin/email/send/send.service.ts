import * as fs from "fs";

import { generateHTMLEmail } from "@vitnode/utils";
import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import {
  HelpersAdminEmailSettingsService,
  ShowAdminEmailSettingsServiceObjWithPassword
} from "../helpers.service";

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
  html: {
    context: Record<string, any>;
    path: string;
  };
  message?: never;
}

@Injectable()
export class SendAdminEmailService extends HelpersAdminEmailSettingsService {
  protected createTransport = ({ pool = false }: { pool?: boolean }) => {
    const data = fs.readFileSync(this.path, "utf-8");
    const config: ShowAdminEmailSettingsServiceObjWithPassword =
      JSON.parse(data);

    return createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password
      },
      secure: config.smtp_secure,
      pool: pool ? true : undefined
    });
  };

  async send({
    to,
    from,
    subject,
    message,
    html
  }:
    | SendAdminEmailServiceArgsWithHtml
    | SendAdminEmailServiceArgsWithMessage): Promise<string> {
    const transporter = this.createTransport({});

    if (html) {
      const test = await generateHTMLEmail();

      return test;
    }

    await transporter.sendMail({
      from,
      to,
      subject,
      text: message
    });

    return "Email sent with Message!";
  }
}
