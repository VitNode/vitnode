import { Injectable } from "@nestjs/common";

import { TestAdminEmailSettingsServiceArgs } from "./dto/test.args";

import { SendAdminEmailService } from "../../send/send.service";

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test(args: TestAdminEmailSettingsServiceArgs): Promise<string> {
    await this.send({
      ...args,
      message: "",
      html: args.message
    });

    return "Email sent!";
  }
}
