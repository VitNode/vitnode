import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

@Injectable()
export class SendAdminEmailService {
  async send(): Promise<string> {
    const transporter = createTransport({
      host: "",
      port: 587,
      auth: {
        user: "",
        pass: ""
      },
      pool: true
    });

    return "Email sent!";
  }
}
