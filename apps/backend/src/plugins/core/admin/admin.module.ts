import { Module } from "@nestjs/common";

import { AdminInstallModule } from "./install/install.module";
import {
  AdminSessionsModule,
  GlobalAdminSessionsModule
} from "./sessions/sessions.module";
import { AdminSettingsModule } from "./settings/settings.module";
import { AdminPluginsModule } from "./plugins/plugins.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminFilesModule } from "./files/files.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminLanguagesModule } from "./languages/languages.module";
import { AdminMembersModule } from "./members/members.module";
import { AdminNavModule } from "./nav/nav.module";
import { AdminStaffModule } from "./staff/staff.module";
import { AdminThemeEditorModule } from "./theme_editor/theme_editor.module";
import { AdminEmailModule } from "./email/email.module";

@Module({
  imports: [
    AdminInstallModule,
    GlobalAdminSessionsModule,
    AdminSessionsModule,
    AdminSettingsModule,
    AdminPluginsModule,
    AdminMetadataModule,
    AdminFilesModule,
    AdminGroupsModule,
    AdminLanguagesModule,
    AdminMembersModule,
    AdminNavModule,
    AdminStaffModule,
    AdminThemeEditorModule,
    AdminEmailModule
  ]
})
export class AdminModule {}
