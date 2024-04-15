import { Injectable } from "@nestjs/common";

import { ShowSettingsObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import { getConfigFile } from "@/config/get-config-file";

@Injectable()
export class ShowSettingsService {
  constructor(private databaseService: DatabaseService) {}

  async show(): Promise<ShowSettingsObj> {
    const config = await getConfigFile();

    return {
      site_name: config.settings.general.site_name
    };
  }
}
