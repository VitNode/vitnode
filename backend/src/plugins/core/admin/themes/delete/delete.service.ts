import { rm } from "fs/promises";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NotFoundError, CustomError } from "@vitnode/backend";

import { DeleteAdminThemesArgs } from "./dto/delete.args";

import { core_themes } from "../../database/schema/themes";
import { DatabaseService } from "@/database/database.service";
import { setRebuildRequired } from "@/functions/rebuild-required";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DeleteAdminThemesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ id }: DeleteAdminThemesArgs): Promise<string> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!theme) {
      throw new NotFoundError("Theme");
    }

    if (theme.id === 1) {
      throw new CustomError({
        code: "DELETE_DEFAULT_THEME",
        message: "You can't delete the default theme."
      });
    }

    await this.databaseService.db
      .delete(core_themes)
      .where(eq(core_themes.id, id));

    const path = ABSOLUTE_PATHS.frontend.theme({ theme_id: id }).root;
    // Check if folder exists
    if (fs.existsSync(path)) {
      rm(path, {
        recursive: true
      });
    }

    await setRebuildRequired({ set: "themes" });

    return "Success!";
  }
}
