import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { MailArgs } from "./dto/mail.args";

@Injectable()
export class MailService {
  constructor() {}

  async send({
    content,
    receiver_address,
    subject
  }: MailArgs): Promise<string> {
    const rawMailCredentials = fs
      .readFileSync("plugins/core/mail/send/mail_credentials.json")
      .toString();
    const mailCredentials = JSON.parse(rawMailCredentials);

    const transporter = createTransport({
      host: mailCredentials.host,
      port: 587,
      auth: {
        user: mailCredentials.user,
        pass: mailCredentials.pass
      }
    });

    await transporter.sendMail({
      from: mailCredentials.user,
      to: receiver_address,
      text: content,
      subject: subject
    });

    return "Success!";
  }
}
