import { Module } from "@nestjs/common";

import { ShowForumForumsResolver } from "./show/show.resolver";
import { ShowForumForumsService } from "./show/show.service";
import { StatsShowForumForumsService } from "./show/stats.service";

@Module({
  providers: [
    ShowForumForumsResolver,
    ShowForumForumsService,
    StatsShowForumForumsService
  ],
  exports: [ShowForumForumsService, StatsShowForumForumsService]
})
export class ForumsForumModule {}
