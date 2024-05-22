import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { DeleteCreateAdminNavPluginsArgs } from "./dto/delete.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class DeleteAdminNavPluginsService {
  delete({ code, plugin_code }: DeleteCreateAdminNavPluginsArgs): string {
    const pathConfig = ABSOLUTE_PATHS.plugin({ code: plugin_code }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8")
    );

    const codeExists = config.nav.find(nav => nav.code === code);
    if (!codeExists) {
      throw new NotFoundError("Plugin nav");
    }

    // Update config
    config.nav = config.nav.filter(nav => nav.code !== code);

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return "Success!";
  }
}
