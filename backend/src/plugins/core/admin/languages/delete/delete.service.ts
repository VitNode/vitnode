import { rm } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteCoreAdminLanguagesArgs } from "./dto/delete.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_languages } from "../../database/schema/languages";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { setRebuildRequired } from "@/functions/rebuild-required";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DeleteAdminCoreLanguageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ code }: DeleteCoreAdminLanguagesArgs): Promise<string> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.code, code)
      });

    if (!language) {
      throw new NotFoundError("Language");
    }

    if (language.protected) {
      throw new CustomError({
        code: "PROTECTED_LANGUAGE",
        message: "This language is protected and cannot be deleted"
      });
    }

    if (language.default) {
      throw new CustomError({
        code: "DEFAULT_LANGUAGE",
        message: "This language is default and cannot be deleted"
      });
    }

    await this.databaseService.db
      .delete(core_languages)
      .where(eq(core_languages.code, code));

    const path = join(ABSOLUTE_PATHS.frontend.langs, code);
    if (existsSync(path)) {
      rm(path, { recursive: true });
    }

    // Remove assets
    const assetsPath = join(ABSOLUTE_PATHS.uploads.public, "assets", code);
    rm(assetsPath, { recursive: true });

    await setRebuildRequired({ set: "langs" });

    return "Success!";
  }
}
