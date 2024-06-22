import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminNavModule } from "./nav/nav.module";
import { AdminStaffModule } from "./staff/staff.module";
import { AdminLanguagesModule } from "./languages/languages.module";
import { AdminFilesModule } from "./files/files.module";
import { AdminMembersModule } from "./members/members.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminSettingsModule } from "./settings/settings.module";

@Module({
  imports: [
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminPluginsModule,
    AdminNavModule,
    AdminStaffModule,
    AdminLanguagesModule,
    AdminFilesModule,
    AdminMembersModule,
    AdminGroupsModule,
    AdminMetadataModule,
    AdminSettingsModule
  ]
})
export class AdminModule {}
