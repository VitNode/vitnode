import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminNavModule } from "./nav/nav.module";

@Module({
  imports: [
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminPluginsModule,
    AdminNavModule
  ]
})
export class AdminModule {}
