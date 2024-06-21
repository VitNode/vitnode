import { Module } from "@nestjs/common";

import { AdminInstallModule } from "./install/install.module";
import { AdminSettingsModule } from "./settings/settings.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminFilesModule } from "./files/files.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminLanguagesModule } from "./languages/languages.module";
import { AdminMembersModule } from "./members/members.module";
import { AdminStaffModule } from "./staff/staff.module";
import { AdminThemeEditorModule } from "./theme_editor/theme_editor.module";
import { AdminEmailModule } from "./email/email.module";

@Module({
  imports: [
    AdminInstallModule,
    AdminSettingsModule,
    AdminMetadataModule,
    AdminFilesModule,
    AdminGroupsModule,
    AdminLanguagesModule,
    AdminMembersModule,
    AdminStaffModule,
    AdminThemeEditorModule,
    AdminEmailModule
  ]
})
export class AdminModule {}
