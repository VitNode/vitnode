import { Module } from "@nestjs/common";

import { CoreMiddlewareCron } from "./middleware.cron";

@Module({
  providers: [CoreMiddlewareCron]
})
export class CoreMiddlewareModule {}
