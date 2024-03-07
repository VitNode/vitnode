import { Module } from "@nestjs/common";

import { AdminCoreModule } from "./core/core.module";
import { GlobalAdminSessionsModule } from "./core/sessions/sessions.module";

@Module({
  imports: [GlobalAdminSessionsModule, AdminCoreModule]
})
export class AdminModule {}
