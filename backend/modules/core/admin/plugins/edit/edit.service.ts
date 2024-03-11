import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { ShowAdminPlugins } from "../show/dto/show.obj";
import { EditAdminPluginsArgs } from "./dto/edit.args";
import { pluginPaths } from "../paths";
import { ConfigPlugin } from "../plugins.module";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins } from "../../database/schema/plugins";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class EditAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async edit({
    code,
    ...rest
  }: EditAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const updatePlugin = await this.databaseService.db
      .update(core_plugins)
      .set({
        ...rest
      })
      .where(eq(core_plugins.code, code))
      .returning();

    // Update plugin.json
    const path = join(pluginPaths({ code }).backend.root, "plugin.json");
    const pluginFile = fs.readFileSync(path, "utf8");
    const config: Omit<ConfigPlugin, "versions" | "version_code"> =
      JSON.parse(pluginFile);

    config.name = rest.name;
    config.description = rest.description;
    config.author = rest.author;
    config.author_url = rest.author_url;
    config.support_url = rest.support_url;

    fs.writeFile(path, JSON.stringify(config, null, 2), err => {
      if (err) {
        throw new CustomError({
          code: "CANNOT_WRITE_FILE",
          message: `Cannot write file with "${path}" path!`
        });
      }
    });

    return updatePlugin[0];
  }
}
