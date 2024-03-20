import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { EditCreateAdminNavPluginsArgs } from "./dto/edit.args";

import { DatabaseService } from "@/modules/database/database.service";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { CustomError } from "@/utils/errors/CustomError";
import { core_plugins_nav } from "../../../database/schema/plugins";

@Injectable()
export class EditAdminNavPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async edit({
    code,
    href,
    icon,
    id
  }: EditCreateAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj> {
    const nav = await this.databaseService.db.query.core_plugins_nav.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!nav) {
      throw new NotFoundError("Plugin Nav");
    }

    const currentCode = removeSpecialCharacters(code);

    if (currentCode !== nav.code) {
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
    }

    const navUpdate = await this.databaseService.db
      .update(core_plugins_nav)
      .set({
        code: currentCode,
        icon,
        href: removeSpecialCharacters(href)
      })
      .where(eq(core_plugins_nav.id, id))
      .returning();

    return navUpdate[0];
  }
}
