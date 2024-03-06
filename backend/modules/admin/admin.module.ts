import { Module } from "@nestjs/common";

import { AdminCoreModule } from "./core/core.module";
import { AdminForumModule } from "./forum/forum.module";
import { GlobalAdminSessionsModule } from "./core/sessions/sessions.module";
// ! === IMPORT ===

@Module({
  imports: [
    GlobalAdminSessionsModule,
    AdminCoreModule,
    AdminForumModule
    // ! === MODULE ===
  ]
})
export class AdminModule {}
