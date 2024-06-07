import { Injectable } from "@nestjs/common";

import { TestAdminEmailSettingsServiceArgs } from "./dto/test.args";

import { SendAdminEmailService } from "../../send/send.service";

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test({ to, from }: TestAdminEmailSettingsServiceArgs): Promise<string> {
    await this.send({ to, from });

    return "Email sent!";
  }
}
