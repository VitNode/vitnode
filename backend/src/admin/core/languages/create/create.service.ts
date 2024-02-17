import { Injectable } from "@nestjs/common";

import { CreateCoreAdminLanguagesArgs } from "./dto/edit.args";

import { DatabaseService } from "@/database/database.service";
import { ShowCoreLanguages } from "@/src/core/languages/show/dto/show.obj";
import { CustomError } from "@/utils/errors/CustomError";

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

    return {
      id: 1,
      name: "test",
      code: "test",
      timezone: "test",
      default: true,
      protected: true,
      enabled: true
    };
  }
}
