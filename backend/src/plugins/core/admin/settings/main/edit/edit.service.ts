import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditAdminMainSettingsArgs } from "./dto/edit.args";
import { EditAdminSettingsObj } from "./dto/edit.obj";

import { core_languages } from "../../../database/schema/languages";
import { DatabaseService } from "@/database/database.service";
import { ManifestWithLang } from "@/plugins/core/settings/settings.module";
import {
  ABSOLUTE_PATHS,
  ConfigType,
  configPath,
  getConfigFile
} from "@/config";

@Injectable()
export class EditAdminMainSettingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  protected async updateDescription({
    languages,
    site_description
  }: {
    languages: { code: string }[];
    site_description: EditAdminMainSettingsArgs["site_description"];
  }) {
    const update = site_description.map(el => {
      const item = el.value
        ? el
        : site_description.find(el => el.language_code === "en")?.value
          ? site_description.find(el => el.language_code === "en")
          : site_description.filter(el => el.value)[0];

      const path = join(
        ABSOLUTE_PATHS.uploads.public,
        "assets",
        item.language_code,
        "manifest.webmanifest"
      );
      const data = fs.readFileSync(path, "utf8");
      const manifest: ManifestWithLang = JSON.parse(data);
      const newData: ManifestWithLang = {
        ...manifest,
        lang: el.language_code,
        description: item.value
      };

      fs.writeFileSync(path, JSON.stringify(newData, null, 2), "utf8");

      return el.language_code;
    });

    // Update rest of the languages
    languages
      .filter(item => !update.includes(item.code))
      .map(item => {
        const value =
          site_description.find(el => el.language_code === "en")?.value ??
          site_description[0]?.value ??
          "";

        const path = join(
          ABSOLUTE_PATHS.uploads.public,
          "assets",
          item.code,
          "manifest.webmanifest"
        );
        const data = fs.readFileSync(path, "utf8");
        const manifest: ManifestWithLang = JSON.parse(data);
        const newData: ManifestWithLang = {
          ...manifest,
          description: value
        };

        fs.writeFileSync(path, JSON.stringify(newData, null, 2), "utf8");
      });
  }

  protected async updateCopyright({
    languages,
    site_copyright
  }: {
    languages: { code: string }[];
    site_copyright: EditAdminMainSettingsArgs["site_copyright"];
  }) {
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
    const languages = await this.databaseService.db
      .select()
      .from(core_languages);
    await this.updateDescription({ site_description, languages });
    await this.updateCopyright({ site_copyright, languages });

    return {
      site_name,
      site_copyright,
      site_description
    };
  }
}
