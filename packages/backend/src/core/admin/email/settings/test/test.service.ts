import { Injectable } from "@nestjs/common";

import { TestAdminEmailSettingsServiceArgs } from "./dto/test.args";

import { SendAdminEmailService } from "../../send/send.service";

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test({
    from,
    to,
    subject,
    message
  }: TestAdminEmailSettingsServiceArgs): Promise<string> {
    await this.send({
      from,
      to,
      subject,
      message
    });

    return "Email sent!";
  }
}
