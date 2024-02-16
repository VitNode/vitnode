import { Module } from "@nestjs/common";

import { ShowCoreLanguageService } from "./show/show.service";
import { ShowCoreLanguagesResolver } from "./show/show.resolver";

@Module({
  providers: [ShowCoreLanguageService, ShowCoreLanguagesResolver]
})
export class CoreLanguagesModule {}
