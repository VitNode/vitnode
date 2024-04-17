import * as fs from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";

import { Injectable } from "@nestjs/common";

import { CreateAdminThemesArgs } from "./dto/create.args";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import { core_themes } from "../../database/schema/themes";

@Injectable()
export class CreateAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    author,
    author_url,
    name,
    support_url
  }: CreateAdminThemesArgs): Promise<ShowAdminThemes> {
    const theme = await this.databaseService.db
      .insert(core_themes)
      .values({
        name,
        support_url,
        author,
        author_url
      })
      .returning();

    const { id } = theme[0];

    // Copy the default theme to the new theme
    const path = join("..", "frontend", "themes", id.toString());
    fs.cpSync(join("..", "frontend", "themes", "1"), path, {
      recursive: true
    });

    // Update the theme.json file
    const pathThemeConfig = `${path}/theme.json`;
    await writeFile(
      pathThemeConfig,
      JSON.stringify(
        { name, version: "", version_code: 0, author, author_url, support_url },
        null,
        2
      )
    );

    // Update the global.scss file
    const pathSCSSFile = `${path}/core/layout/global.scss`;
    const pathSCSSFileContent = fs.readFileSync(pathSCSSFile, "utf8");
    await writeFile(
      pathSCSSFile,
      pathSCSSFileContent.replaceAll(".theme_1", `.theme_${id}`)
    );

    return theme[0];
  }
}
