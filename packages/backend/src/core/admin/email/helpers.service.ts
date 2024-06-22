import { join } from "path";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "./settings/show/dto/show.obj";

import { ABSOLUTE_PATHS_BACKEND } from "../../..";

export interface ShowAdminEmailSettingsServiceObjWithPassword
  extends ShowAdminEmailSettingsServiceObj {
  smtp_password: string;
}

@Injectable()
export class HelpersAdminEmailSettingsService {
  protected readonly path: string = join(
    ABSOLUTE_PATHS_BACKEND.plugin({ code: "core" }).root,
    "email.config.json"
  );
}
