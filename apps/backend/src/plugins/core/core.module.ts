import { Module } from "@nestjs/common";

import { AdminModule } from "./admin/admin.module";
import { CoreSettingsModule } from "./settings/settings.module";
import { CoreFilesModule, GlobalCoreFilesModule } from "./files/files.module";
import { CoreEditorModule } from "./editor/editor.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";
import { CoreLanguagesModule } from "./languages/languages.module";
import { CoreMembersModule } from "./members/members.module";
import { CoreMiddlewareModule } from "./middleware/middleware.module";
import { CorePluginsModule } from "./plugins/plugins.module";
import { CoreThemeEditorModule } from "./theme_editor/theme_editor.module";

@Module({
  imports: [
    AdminModule,
    CoreSettingsModule,
    GlobalCoreFilesModule,
    CoreFilesModule,
    CoreEditorModule,
    GlobalCoreHelpersModule,
    CoreLanguagesModule,
    CoreMembersModule,
    CoreMiddlewareModule,
    CorePluginsModule,
    CoreThemeEditorModule
  ],
  providers: []
})
export class CoreModule {}
