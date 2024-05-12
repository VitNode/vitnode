import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { CreateCoreAdminLanguagesArgs } from "./dto/create.args";

import { ShowCoreLanguages } from "@/plugins/core/languages/show/dto/show.obj";
import { core_languages } from "../../database/schema/languages";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { setRebuildRequired } from "@/functions/rebuild-required";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class CreateAdminCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    code,
    locale,
    name,
    time_24,
    timezone
  }: CreateCoreAdminLanguagesArgs): Promise<ShowCoreLanguages> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.code, code)
      });

    if (language) {
      throw new CustomError({
        code: "LANGUAGE_ALREADY_EXISTS",
        message: "Language already exists"
      });
    }

    const newLanguage = await this.databaseService.db
      .insert(core_languages)
      .values({
        code,
        name,
        timezone,
        default: false,
        protected: false,
        enabled: true,
        time_24,
        locale
      })
      .returning();

    // Clone JSONs from lang folder in frontend
    fs.cpSync(
      join(ABSOLUTE_PATHS.frontend.langs, "en"),
      join(ABSOLUTE_PATHS.frontend.langs, code),
      { recursive: true }
    );

    await setRebuildRequired({ set: "langs" });

    return newLanguage[0];
  }
}
