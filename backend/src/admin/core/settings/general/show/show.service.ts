import { Injectable } from "@nestjs/common";

import { ShowGeneralAdminSettingsObj } from "./dto/show.obj";

import { getConfigFile } from "@/functions/config/get-config-file";

@Injectable()
export class ShowGeneralAdminSettingsService {
  async show(): Promise<ShowGeneralAdminSettingsObj> {
    const config = await getConfigFile();

    return {
      side_name: config.side_name
    };
  }
}
