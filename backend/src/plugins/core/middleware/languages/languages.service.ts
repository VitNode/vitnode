import { Injectable } from "@nestjs/common";

import { LanguagesCoreMiddlewareObj } from "./dto/languages.obj";

import { getConfigFile } from "@/config";

@Injectable()
export class LanguagesCoreMiddlewareService {
  languages(): LanguagesCoreMiddlewareObj[] {
    const config = getConfigFile();

    return config.langs;
  }
}
