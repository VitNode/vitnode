import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import {
  CoreSessionsModule,
  GlobalCoreSessionsModule
} from "./sessions/sessions.module";
import { CoreSettingsModule } from "./settings/settings.module";
import { CoreFilesModule, GlobalCoreFilesModule } from "./files/files.module";
import { CoreEditorModule } from "./editor/editor.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";
import { CoreLanguagesModule } from "./languages/languages.module";
import { CoreMailModule } from "./mail/mail.module";
import { CoreMembersModule } from "./members/members.module";
import { CoreMiddlewareModule } from "./middleware/middleware.module";
import { CoreNavModule } from "./nav/nav.module";
import { CorePluginsModule } from "./plugins/plugins.module";
import { CoreThemesModule } from "./themes/themes.module";

@Module({
  imports: [
    AdminModule,
    GlobalCoreSessionsModule,
    CoreSessionsModule,
    CoreSettingsModule,
    GlobalCoreFilesModule,
    CoreFilesModule,
    CoreEditorModule,
    GlobalCoreHelpersModule,
    CoreLanguagesModule,
    CoreMailModule,
    CoreMembersModule,
    CoreMiddlewareModule,
    CoreNavModule,
    CorePluginsModule,
    CoreThemesModule
  ]
})
export class CoreModule {}
