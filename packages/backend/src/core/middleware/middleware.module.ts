import { Module } from "@nestjs/common";

import { CoreMiddlewareCron } from "./middleware.cron";
import { ShowCoreMiddlewareService } from "./show/show.service";
import { ShowCoreMiddlewareResolver } from "./show/show.resolver";

@Module({
  providers: [
    CoreMiddlewareCron,
    ShowCoreMiddlewareService,
    ShowCoreMiddlewareResolver,
  ],
})
export class CoreMiddlewareModule {}
