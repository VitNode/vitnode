import { Injectable } from "@nestjs/common";
import { MailArgs } from "./dto/mail.args";
const nodemailer = require("nodemailer");

@Injectable()
export class MailService {
  constructor() {}

  async send({
    receiver_address,
    subject,
    content
  }: MailArgs): Promise<String> {
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", //Todo
      port: 587,
      auth: {
        user: "example@example.com", //Todo
        pass: "example_password" //Todo
      }
    });

    await transporter.sendMail({
      from: "example@example.com", //Todo
      to: receiver_address,
      subject: subject,
      content: content
    });
    return "Success!";
  }
}
