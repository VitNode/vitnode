import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminEmailSettingsServiceObj } from "../show/dto/show.obj";
import { EditAdminEmailSettingsServiceArgs } from "./dto/edit.args";

import {
  HelpersAdminEmailSettingsService,
  ShowAdminEmailSettingsServiceObjWithPassword
} from "../../helpers.service";

@Injectable()
export class EditAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
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
    const dataToSave = {
      ...rest,
      password: password || config.password
    };

    fs.writeFileSync(this.path, JSON.stringify(dataToSave, null, 2));

    return rest;
  }
}
