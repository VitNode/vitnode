import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { CreateAdminNavPluginsArgs } from "./dto/create.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { CustomError } from "@/utils/errors/custom-error";
import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class CreateAdminNavPluginsService {
  create({
    code,
    href,
    icon,
    plugin_code,
    parent_code
  }: CreateAdminNavPluginsArgs): ShowAdminNavPluginsObj {
    const pathConfig = ABSOLUTE_PATHS.plugin({ code: plugin_code }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }
    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8")
    );

    const currentCode = removeSpecialCharacters(code);
    const codeExists = config.nav.find(nav => nav.code === currentCode);

    if (codeExists) {
      throw new CustomError({
        message: "Code already exists",
        code: "CODE_ALREADY_EXISTS"
      });
    }

    // Update config
    if (parent_code) {
      const parent = config.nav.find(nav => nav.code === parent_code);

      if (!parent) {
        throw new NotFoundError("Parent");
      }

      parent.children = parent.children || [];
      parent.children.push({
        code: currentCode,
        href,
        icon
      });
    } else {
      config.nav.push({
        code: currentCode,
        href,
        icon
      });
    }

    // Save config
    fs.writeFileSync(pathConfig, JSON.stringify(config, null, 2));

    return {
      code: currentCode,
      href,
      icon
    };
  }
}
