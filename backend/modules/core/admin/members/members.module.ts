import { Module } from "@nestjs/common";

import { ShowAdminMembersResolver } from "./show/show.resolver";
import { ShowAdminMembersService } from "./show/show.service";
import { StatsAdminMembersResolver } from "./stats/stats.resolver";
import { StatsAdminMembersService } from "./stats/stats.service";

@Module({
  providers: [
    ShowAdminMembersResolver,
    ShowAdminMembersService,
    StatsAdminMembersResolver,
    StatsAdminMembersService
  ]
})
export class AdminMembersModule {}
