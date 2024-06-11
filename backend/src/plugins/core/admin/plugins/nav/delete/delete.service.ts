import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { NotFoundError } from "@vitnode/backend";

import { DeleteCreateAdminNavPluginsArgs } from "./dto/delete.args";

import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class DeleteAdminNavPluginsService {
  delete({
    code,
    plugin_code,
    parent_code
  }: DeleteCreateAdminNavPluginsArgs): string {
    const pathConfig = ABSOLUTE_PATHS.plugin({ code: plugin_code }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8")
    );

    // Update config
    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError("Parent nav");
      }

      parent.children = parent.children.filter(child => child.code !== code);
    } else {
      const codeExists = config.nav.find(nav => nav.code === code);
      if (!codeExists) {
        throw new NotFoundError("Plugin nav");
      }

      config.nav = config.nav.filter(nav => nav.code !== code);
    }

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return "Success!";
  }
}
