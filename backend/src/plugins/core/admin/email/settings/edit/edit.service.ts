import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "../show/dto/show.obj";
import { EditAdminEmailSettingsServiceArgs } from "./dto/edit.args";

import { ABSOLUTE_PATHS } from "@/config";

interface ShowAdminEmailSettingsServiceObjWithPassword
  extends ShowAdminEmailSettingsServiceObj {
  password: string;
}

@Injectable()
export class EditAdminEmailSettingsService {
  private readonly path: string = join(
    ABSOLUTE_PATHS.plugin({ code: "core" }).root,
    "admin",
    "email",
    "email.config.json"
  );

  edit(
    data: EditAdminEmailSettingsServiceArgs
  ): ShowAdminEmailSettingsServiceObj {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify(data, null, 2));

      return data;
    }

    const read = fs.readFileSync(this.path, "utf-8");
    const config: ShowAdminEmailSettingsServiceObjWithPassword =
      JSON.parse(read);
    const { password, ...rest } = data;

    fs.writeFileSync(
      this.path,
      JSON.stringify(
        {
          ...rest,
          password: password || config.password
        },
        null,
        2
      )
    );

    return rest;
  }
}
