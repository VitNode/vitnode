import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditAdminMainSettingsArgs } from "./dto/edit.args";
import { EditAdminSettingsObj } from "./dto/edit.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  ConfigType,
  configPath,
  getConfigFile
} from "@/config/get-config-file";
import { core_languages } from "../../../database/schema/languages";

@Injectable()
export class EditAdminMainSettingsService {
  constructor(private databaseService: DatabaseService) {}

  protected async updateDescription({
    site_description
  }: {
    site_description: EditAdminMainSettingsArgs["site_description"];
  }) {
    const languages = await this.databaseService.db
      .select()
      .from(core_languages);

    // Update site_description
    const update = await Promise.all(
      site_description.map(async item => {
        const itemExists = languages.find(
          language => language.code === item.language_code
        );

        if (!itemExists) return;

        const update = await this.databaseService.db
          .update(core_languages)
          .set({
            site_description: item.value
          })
          .where(eq(core_languages.code, item.language_code))
          .returning();

        return update[0];
      })
    );

    await Promise.all(
      languages.map(async item => {
        const exist = update
          .filter(item => item)
          .find(el => el.code === item.code);
        if (exist) return;

        await this.databaseService.db
          .update(core_languages)
          .set({
            site_description: ""
          })
          .where(eq(core_languages.code, item.code));
      })
    );
  }

  protected async updateCopyright({
    site_copyright
  }: {
    site_copyright: EditAdminMainSettingsArgs["site_copyright"];
  }) {
    const languages = await this.databaseService.db
      .select()
      .from(core_languages);

    // Update site_description
    const update = await Promise.all(
      site_copyright.map(async item => {
        const itemExists = languages.find(
          language => language.code === item.language_code
        );

        if (!itemExists) return;

        const update = await this.databaseService.db
          .update(core_languages)
          .set({
            site_copyright: item.value
          })
          .where(eq(core_languages.code, item.language_code))
          .returning();

        return update[0];
      })
    );

    await Promise.all(
      languages.map(async item => {
        const exist = update
          .filter(item => item)
          .find(el => el.code === item.code);
        if (exist) return;

        await this.databaseService.db
          .update(core_languages)
          .set({
            site_copyright: ""
          })
          .where(eq(core_languages.code, item.code));
      })
    );
  }

  async edit({
    site_copyright,
    site_description,
    site_name,
    site_short_name
  }: EditAdminMainSettingsArgs): Promise<EditAdminSettingsObj> {
    const config = await getConfigFile();
    const newData: ConfigType = {
      ...config,
      settings: {
        ...config.settings,
        general: {
          ...config.settings.general,
          site_name,
          site_short_name
        }
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");
    await this.updateDescription({ site_description });
    await this.updateCopyright({ site_copyright });

    return {
      site_name,
      site_copyright,
      site_description
    };
  }
}
