import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { EditAdminGeneralSettingsArgs } from "./dto/edit.args";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  ConfigType,
  configPath,
  getConfigFile
} from "@/config/get-config-file";
import { ShowSettingsObj } from "@/plugins/core/settings/show/dto/show.obj";

@Injectable()
export class EditAdminGeneralSettingsService {
  constructor(private databaseService: DatabaseService) {}

  async edit({
    site_name
  }: EditAdminGeneralSettingsArgs): Promise<ShowSettingsObj> {
    const config = await getConfigFile();
    const newData: ConfigType = {
      ...config,
      settings: {
        ...config.settings,
        general: {
          ...config.settings.general,
          site_name
        }
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");

    return {
      site_name
    };
  }
}
