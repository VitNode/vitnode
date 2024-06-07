import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "./dto/show.obj";

import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class ShowAdminEmailSettingsService {
  private readonly path = join(
    ABSOLUTE_PATHS.plugin({ code: "core" }).root,
    "admin",
    "email",
    "email.config.json"
  );

  show(): ShowAdminEmailSettingsServiceObj {
    if (!fs.existsSync(this.path)) {
      return {
        host: "",
        user: "",
        secure: false,
        port: 587
      };
    }

    const read = fs.readFileSync(this.path, "utf-8");
    const config: ShowAdminEmailSettingsServiceObj = JSON.parse(read);

    return config;
  }
}
