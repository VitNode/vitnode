import { Module } from "@nestjs/common";

import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminInstallModule } from "./install/install.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminMembersModule } from "./members/members.module";
import { AdminStaffModule } from "./staff/staff.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminThemesModule } from "./themes/themes.module";
import { AdminNavModule } from "./nav/nav.module";
import { AdminLanguagesModule } from "./languages/languages.module";
import { AdminSettingsModule } from "./settings/settings.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminFilesModule } from "./files/files.module";

@Module({
  imports: [
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminInstallModule,
    AdminGroupsModule,
    AdminMembersModule,
    AdminStaffModule,
    AdminPluginsModule,
    AdminThemesModule,
    AdminNavModule,
    AdminLanguagesModule,
    AdminSettingsModule,
    AdminMetadataModule,
    AdminFilesModule
  ]
})
export class AdminModule {}
