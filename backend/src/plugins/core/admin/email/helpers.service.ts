import { join } from "path";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "./settings/show/dto/show.obj";

import { ABSOLUTE_PATHS } from "@/config";

export interface ShowAdminEmailSettingsServiceObjWithPassword
  extends ShowAdminEmailSettingsServiceObj {
  smtp_password: string;
}

@Injectable()
export class HelpersAdminEmailSettingsService {
  protected readonly path: string = join(
    ABSOLUTE_PATHS.plugin({ code: "core" }).root,
    "admin",
    "email",
    "email.config.json"
  );
}
