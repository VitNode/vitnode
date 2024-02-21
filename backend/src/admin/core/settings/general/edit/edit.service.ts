import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { GeneralAdminSettingsObj } from "../dto/general.obj";
import { EditGeneralAdminSettingsArgs } from "./dto/edit.args";

import { configPath, getConfigFile } from "@/functions/config/get-config-file";

@Injectable()
export class EditGeneralAdminSettingsService {
  async edit(
    data: EditGeneralAdminSettingsArgs
  ): Promise<GeneralAdminSettingsObj> {
    const config = await getConfigFile();

    const newData = {
      ...config,
      ...data
    };

    fs.writeFile(configPath, JSON.stringify(newData, null, 2), "utf8", err => {
      if (err) throw err;
    });

    return data;
  }
}
