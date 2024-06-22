import { Module } from "@nestjs/common";

import { AdminModule } from "./admin/admin.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";
import { CoreThemeEditorModule } from "./theme_editor/theme_editor.module";

@Module({
  imports: [AdminModule, GlobalCoreHelpersModule, CoreThemeEditorModule],
  providers: []
})
export class CoreModule {}
