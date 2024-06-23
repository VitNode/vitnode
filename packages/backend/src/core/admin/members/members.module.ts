import { Module } from "@nestjs/common";

import { ShowAdminMembersResolver } from "./show/show.resolver";
import { ShowAdminMembersService } from "./show/show.service";
import { StatsAdminMembersResolver } from "./stats/stats.resolver";
import { StatsAdminMembersService } from "./stats/stats.service";
import { EditAdminMembersResolver } from "./edit/edit.resolver";
import { EditAdminMembersService } from "./edit/edit.service";

@Module({
  providers: [
    ShowAdminMembersResolver,
    ShowAdminMembersService,
    StatsAdminMembersResolver,
    StatsAdminMembersService,
    EditAdminMembersResolver,
    EditAdminMembersService,
  ],
})
export class AdminMembersModule {}
