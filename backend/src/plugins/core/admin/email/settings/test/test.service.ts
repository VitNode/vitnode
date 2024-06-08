import { join } from "path";

import { Injectable } from "@nestjs/common";

import { TestAdminEmailSettingsServiceArgs } from "./dto/test.args";

import { SendAdminEmailService } from "../../send/send.service";

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test({
    from,
    to,
    subject
  }: TestAdminEmailSettingsServiceArgs): Promise<string> {
    await this.send({
      from,
      to,
      subject,
      html: {
        path: join(__dirname, "test.email.tsx"),
        context: {}
      }
    });

    return "Email sent!";
  }
}
