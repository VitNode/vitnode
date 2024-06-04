import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class ChangePositionAdminNavPluginsService {
  changePosition({
    code,
    plugin_code,
    index_to_move,
    parent_code
  }: ChangePositionAdminNavPluginsArgs): string {
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
    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError("Parent");
      }

      const children = parent.children || [];
      const navIndex = children.findIndex(nav => nav.code === code);
      const nav = children[navIndex];
      children.splice(navIndex, 1);
      children.splice(index_to_move, 0, nav);
    } else {
      const navIndex = config.nav.findIndex(nav => nav.code === code);
      const nav = config.nav[navIndex];
      config.nav.splice(navIndex, 1);
      config.nav.splice(index_to_move, 0, nav);
    }

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return "Success!";
  }
}
