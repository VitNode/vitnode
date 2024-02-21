import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { CreateCoreAdminLanguagesArgs } from "./dto/edit.args";

import { DatabaseService } from "@/database/database.service";
import { ShowCoreLanguages } from "@/src/core/languages/show/dto/show.obj";
import { CustomError } from "@/utils/errors/CustomError";
import { core_languages } from "../../database/schema/languages";
import { currentDate } from "@/functions/date";
import { setRebuildRequired } from "@/functions/config/rebuild-required";

@Injectable()
export class CreateAdminCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    code,
    name,
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
        created: currentDate()
      })
      .returning();

    // Clone JSONs from lang folder in frontend
    fs.cpSync(
      join("..", "frontend", "langs", "en"),
      join("..", "frontend", "langs", code),
      { recursive: true }
    );

    await setRebuildRequired({ set: "langs" });

    return newLanguage[0];
  }
}
