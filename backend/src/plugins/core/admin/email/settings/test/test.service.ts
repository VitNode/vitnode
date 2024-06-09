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
      html: "<h1>Test Email</h1>"
    });

    return "Email sent!";
  }
}
