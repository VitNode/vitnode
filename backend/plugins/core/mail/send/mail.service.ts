import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { MailArgs } from "./dto/mail.args";

@Injectable()
export class MailService {
  private readonly mailCredentials: {
    host: string;

    pass: string;
    user: string;
  };

  constructor() {
    const rawMailCredentials = fs
      .readFileSync("plugins/core/mail/send/mail_credentials.json")
      .toString();
    this.mailCredentials = JSON.parse(rawMailCredentials);
  }

  async send({
    content,
    receiver_address,
    subject
  }: MailArgs): Promise<string> {
    const transporter = createTransport({
      host: this.mailCredentials.host,
      port: 587,
      auth: {
        user: this.mailCredentials.user,
        pass: this.mailCredentials.pass
      }
    });

    await transporter.sendMail({
      from: this.mailCredentials.user,
      to: receiver_address,
      text: content,
      subject: subject
    });

    return "Success!";
  }
}
