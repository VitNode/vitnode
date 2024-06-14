import { readdir } from "fs/promises";

import { Injectable } from "@nestjs/common";

import { ShowCoreMiddlewareObj } from "./dto/languages.obj";

import { ABSOLUTE_PATHS, getConfigFile } from "@/config";

@Injectable()
export class ShowCoreMiddlewareService {
  async languages(): Promise<ShowCoreMiddlewareObj> {
    const config = getConfigFile();

    const plugins = await readdir(ABSOLUTE_PATHS.plugins);

    return {
      languages: config.langs,
      plugins: [
        "admin",
        ...plugins.filter(plugin => !["plugins.module.ts"].includes(plugin))
      ]
    };
  }
}
