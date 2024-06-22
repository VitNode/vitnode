import { Module } from "@nestjs/common";

import { AdminInstallModule } from "./install/install.module";
import { AdminSettingsModule } from "./settings/settings.module";
import { AdminMetadataModule } from "./metadata/metadata.module";
import { AdminGroupsModule } from "./groups/groups.module";
import { AdminThemeEditorModule } from "./theme_editor/theme_editor.module";
import { AdminEmailModule } from "./email/email.module";

@Module({
  imports: [
    AdminInstallModule,
    AdminSettingsModule,
    AdminMetadataModule,
    AdminGroupsModule,
    AdminThemeEditorModule,
    AdminEmailModule
  ]
})
export class AdminModule {}
