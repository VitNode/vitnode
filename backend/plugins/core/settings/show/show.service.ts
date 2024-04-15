import { Injectable } from "@nestjs/common";

import { ShowSettingsObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import { getConfigFile } from "@/config/get-config-file";

@Injectable()
export class ShowSettingsService {
  constructor(private databaseService: DatabaseService) {}

  async show(): Promise<ShowSettingsObj> {
    const config = await getConfigFile();

    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        where: (table, { eq }) => eq(table.enabled, true)
      });

    return {
      site_name: config.settings.general.site_name,
      site_description: languages.map(item => ({
        language_code: item.code,
        value: item.site_description
      })),
      site_copyright: languages.map(item => ({
        language_code: item.code,
        value: item.site_copyright
      }))
    };
  }
}
