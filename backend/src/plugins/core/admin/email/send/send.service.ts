import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import {
  HelpersAdminEmailSettingsService,
  ShowAdminEmailSettingsServiceObjWithPassword
} from "../helpers.service";
import { SendAdminEmailSettingsServiceArgs } from "./dto/send.args";

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
    message
  }: SendAdminEmailSettingsServiceArgs): Promise<string> {
    const transporter = this.createTransport({});

    await transporter.sendMail({
      from,
      to,
      subject,
      text: message
    });

    return "Email sent!";
  }
}
