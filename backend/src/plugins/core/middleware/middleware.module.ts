import { Module } from "@nestjs/common";

import { CoreMiddlewareCron } from "./middleware.cron";
import { LanguagesCoreMiddlewareService } from "./languages/languages.service";
import { LanguagesCoreMiddlewareResolver } from "./languages/languages.resolver";

@Module({
  providers: [
    CoreMiddlewareCron,
    LanguagesCoreMiddlewareService,
    LanguagesCoreMiddlewareResolver
  ]
})
export class CoreMiddlewareModule {}
