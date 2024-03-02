import { Module } from "@nestjs/common";

import { ShowForumForumsResolver } from "./show/show.resolver";
import { ShowForumForumsService } from "./show/show.service";
import { StatsShowForumForumsService } from "./show/stats.service";
import { LastPostsForumForumsService } from "./show/last_posts/last_posts.service";

@Module({
  providers: [
    ShowForumForumsResolver,
    ShowForumForumsService,
    StatsShowForumForumsService,
    LastPostsForumForumsService
  ],
  exports: [
    ShowForumForumsService,
    StatsShowForumForumsService,
    LastPostsForumForumsService
  ]
})
export class ForumsForumModule {}
