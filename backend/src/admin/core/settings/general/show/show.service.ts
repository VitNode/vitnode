import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowGeneralAdminSettingsObj } from "./dto/show.obj";

import { ConfigType, configPath } from "@/config";

@Injectable()
export class ShowGeneralAdminSettingsService {
  async show(): Promise<ShowGeneralAdminSettingsObj> {
    const config = fs.readFileSync(configPath, "utf8");
    const data: ConfigType = JSON.parse(config);

    return {
      side_name: data.side_name
    };
  }
}
