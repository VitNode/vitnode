import { Module } from "@nestjs/common";

import { ShowAdminMembersResolver } from "./show/show.resolver";
import { ShowAdminMembersService } from "./show/show.service";

@Module({
  providers: [ShowAdminMembersResolver, ShowAdminMembersService]
})
export class AdminMembersModule {}
