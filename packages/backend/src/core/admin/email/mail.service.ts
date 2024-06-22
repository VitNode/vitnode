import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";
import * as React from "react";

import {
  HelpersAdminEmailSettingsService,
  ShowAdminEmailSettingsServiceObjWithPassword
} from "./helpers.service";

interface SendMailConfiguration {
  subject: string;
  template: React.ReactElement;
  to: string;
  text?: string;
}

@Injectable()
export class MailService extends HelpersAdminEmailSettingsService {
  private readonly generateEmail = (template: React.ReactElement) => {
    return render(template);
  };

  async sendMail({ to, subject, template }: SendMailConfiguration) {
    const html = this.generateEmail(template);
    const data = fs.readFileSync(this.path, "utf-8");
    const config: ShowAdminEmailSettingsServiceObjWithPassword =
      JSON.parse(data);

    const transporter = nodemailer.createTransport(
      {
        host: config.smtp_host,
        port: config.smtp_port,
        secure: config.smtp_secure,
        auth: {
          user: config.smtp_user,
          pass: config.smtp_password
        }
      },
      {
        from: {
          name: "NestJs + React Emails Test App",
          address: "Test App"
        }
      }
    );

    await transporter.sendMail({
      to,
      from: "test",
      subject,
      html
    });
  }
}
