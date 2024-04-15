import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ShowSettingsObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import { getConfigFile } from "@/config/get-config-file";
import { Ctx } from "@/types/context.type";

@Injectable()
export class ShowSettingsService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  protected async getThemeId({
    req
  }: Pick<Ctx, "req">): Promise<number | null> {
    const cookie_theme_id: string | null =
      req.cookies[this.configService.getOrThrow("cookies.theme_id.name")];

    if (cookie_theme_id) {
      const theme = await this.databaseService.db.query.core_themes.findFirst({
        where: (table, { eq }) => eq(table.id, parseInt(cookie_theme_id))
      });

      if (theme) {
        return theme.id;
      }
    }

    return null;
  }

  async show({ req }: Ctx): Promise<ShowSettingsObj> {
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
      })),
      theme_id: await this.getThemeId({ req })
    };
  }
}
