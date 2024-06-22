import { Module } from "@nestjs/common";

import { AdminInstallModule } from "./install/install.module";
import { AdminThemeEditorModule } from "./theme_editor/theme_editor.module";
import { AdminEmailModule } from "./email/email.module";

@Module({
  imports: [AdminInstallModule, AdminThemeEditorModule, AdminEmailModule]
})
export class AdminModule {}
