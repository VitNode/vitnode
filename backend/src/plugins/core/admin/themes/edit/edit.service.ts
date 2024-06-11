import { join } from "path";
import * as fs from "fs";
import { writeFile } from "fs/promises";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NotFoundError } from "@vitnode/backend";

import { ShowAdminThemes } from "../show/dto/show.obj";
import { EditAdminThemesArgs } from "./dto/edit.args";
import { ConfigTheme } from "../themes.module";

import { core_themes } from "../../database/schema/themes";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class EditAdminThemesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async edit({
    author,
    author_url,
    id,
    name,
    support_url
  }: EditAdminThemesArgs): Promise<ShowAdminThemes> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!theme) {
      throw new NotFoundError("Theme");
    }

    // Update the config.json file
    const pathThemeConfig = join(
      "..",
      "frontend",
      "themes",
      id.toString(),
      "config.json"
    );
    const themeFile = fs.readFileSync(pathThemeConfig, "utf8");
    const config: ConfigTheme = JSON.parse(themeFile);
    await writeFile(
      pathThemeConfig,
      JSON.stringify(
        { ...config, name, author, author_url, support_url },
        null,
        2
      )
    );

    const updateTheme = await this.databaseService.db
      .update(core_themes)
      .set({
        name,
        support_url,
        author,
        author_url
      })
      .where(eq(core_themes.id, id))
      .returning();

    return updateTheme[0];
  }
}
