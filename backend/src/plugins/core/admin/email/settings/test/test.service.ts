import { Injectable } from "@nestjs/common";

import { SendAdminEmailService } from "../../send/send.service";
import { SendAdminEmailSettingsServiceArgs } from "../../send/dto/send.args";

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test(args: SendAdminEmailSettingsServiceArgs): Promise<string> {
    await this.send(args);

    return "Email sent!";
  }
}
