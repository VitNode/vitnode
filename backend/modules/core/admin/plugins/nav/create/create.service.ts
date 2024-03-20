import { Injectable } from "@nestjs/common";

import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { CreateAdminNavPluginsArgs } from "./dto/create.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins_nav } from "../../../database/schema/plugins";
import { CustomError } from "@/utils/errors/CustomError";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";

@Injectable()
export class CreateAdminNavPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    code,
    href,
    icon,
    plugin_code
  }: CreateAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj> {
    const currentCode = removeSpecialCharacters(code);

    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, plugin_code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const codeExists =
      await this.databaseService.db.query.core_plugins_nav.findFirst({
        where: (table, { eq }) => eq(table.code, currentCode)
      });

    if (codeExists) {
      throw new CustomError({
        message: "Code already exists",
        code: "CODE_ALREADY_EXISTS"
      });
    }

    const getLastPosition =
      await this.databaseService.db.query.core_plugins_nav.findFirst({
        orderBy: (table, { desc }) => desc(table.position)
      });

    const nav = await this.databaseService.db
      .insert(core_plugins_nav)
      .values({
        plugin_id: plugin.id,
        code: currentCode,
        icon,
        position: getLastPosition ? getLastPosition.position + 1 : 0,
        href: removeSpecialCharacters(href)
      })
      .returning();

    return nav[0];
  }
}
