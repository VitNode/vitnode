import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { NotFoundError } from "vitnode-backend";

import { ShowAdminNavPluginsArgs } from "./dto/show.args";
import { ShowAdminNavPluginsObj } from "./dto/show.obj";

import { ABSOLUTE_PATHS } from "@/config";
import { ConfigPlugin } from "../../plugins.module";

@Injectable()
export class ShowAdminNavPluginsService {
  show({ plugin_code }: ShowAdminNavPluginsArgs): ShowAdminNavPluginsObj[] {
    const pathConfig = ABSOLUTE_PATHS.plugin({ code: plugin_code }).config;
    if (!fs.existsSync(pathConfig)) {
      throw new NotFoundError("Plugin");
    }

    const config: ConfigPlugin = JSON.parse(
      fs.readFileSync(pathConfig, "utf8")
    );

    return config.nav;
  }
}
