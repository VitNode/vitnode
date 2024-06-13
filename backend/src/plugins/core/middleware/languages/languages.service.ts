import { Injectable } from "@nestjs/common";

import { LanguagesCoreMiddlewareObj } from "./dto/languages.obj";

import { getConfigFile } from "@/config";

@Injectable()
export class LanguagesCoreMiddlewareService {
  languages(): LanguagesCoreMiddlewareObj[] {
    const config = getConfigFile();

    // eslint-disable-next-line no-console
    console.log("triggered languages services", new Date().getTime());

    return config.langs;
  }
}
