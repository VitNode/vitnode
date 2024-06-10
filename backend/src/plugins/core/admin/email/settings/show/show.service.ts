import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "./dto/show.obj";

import { HelpersAdminEmailSettingsService } from "../../helpers.service";
import { getConfigFile } from "@/config";

@Injectable()
export class ShowAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  show(): ShowAdminEmailSettingsServiceObj {
    const {
      settings: { email: emailSettings }
    } = getConfigFile();

    if (!fs.existsSync(this.path)) {
      return {
        smtp_host: "",
        smtp_user: "",
        smtp_secure: false,
        smtp_port: 587,
        ...emailSettings
      };
    }

    const read = fs.readFileSync(this.path, "utf-8");
    const config: ShowAdminEmailSettingsServiceObj = JSON.parse(read);

    return {
      ...config,
      ...emailSettings
    };
  }
}
