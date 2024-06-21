import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminPluginsModule } from "./plugins/plugins.module";

@Module({
  imports: [GlobalAdminSessionsModule, AdminSessionsModule, AdminPluginsModule]
})
export class AdminModule {}
