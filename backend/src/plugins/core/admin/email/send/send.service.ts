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
      host: config.host,
      port: config.port,
      auth: {
        user: config.user,
        pass: config.password
      },
      secure: config.secure,
      pool: pool ? true : undefined
    });
  };

  async send({ to, from }: SendAdminEmailSettingsServiceArgs): Promise<string> {
    const transporter = this.createTransport({});

    try {
      await transporter.sendMail({
        from,
        to,
        subject: "Test email",
        text: "Test email"
      });
    } catch (error) {
      return "Email not sent!";
    }

    return "Email sent!";
  }
}
