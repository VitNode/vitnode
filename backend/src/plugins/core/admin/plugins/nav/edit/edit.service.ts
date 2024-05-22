import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { EditCreateAdminNavPluginsArgs } from "./dto/edit.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { CustomError } from "@/utils/errors/custom-error";
import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class EditAdminNavPluginsService {
  edit({
    code,
    href,
    icon,
    previous_code,
    plugin_code
  }: EditCreateAdminNavPluginsArgs): ShowAdminNavPluginsObj {
    const pathConfig = ABSOLUTE_PATHS.plugin({ code: plugin_code }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8")
    );

    const currentCode = removeSpecialCharacters(code);
    const existsNavCode = config.nav.find(nav => nav.code === currentCode);
    if (existsNavCode) {
      throw new CustomError({
        message: "Code already exists",
        code: "CODE_ALREADY_EXISTS"
      });
    }

    // Update config
    const navIndex = config.nav.findIndex(nav => nav.code === previous_code);
    config.nav[navIndex] = {
      code: currentCode,
      href,
      icon
    };

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return {
      code: currentCode,
      href,
      icon
    };
  }
}
