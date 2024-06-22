import { Module } from "@nestjs/common";

import { AdminModule } from "./admin/admin.module";
import { CoreSettingsModule } from "./settings/settings.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";
import { CoreMiddlewareModule } from "./middleware/middleware.module";
import { CoreThemeEditorModule } from "./theme_editor/theme_editor.module";

@Module({
  imports: [
    AdminModule,
    CoreSettingsModule,
    GlobalCoreHelpersModule,
    CoreMiddlewareModule,
    CoreThemeEditorModule
  ],
  providers: []
})
export class CoreModule {}
