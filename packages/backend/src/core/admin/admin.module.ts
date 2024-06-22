import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminNavModule } from "./nav/nav.module";
import { AdminStaffModule } from "./staff/staff.module";
import { AdminLanguagesModule } from "./languages/languages.module";

@Module({
  imports: [
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminPluginsModule,
    AdminNavModule,
    AdminStaffModule,
    AdminLanguagesModule
  ]
})
export class AdminModule {}
