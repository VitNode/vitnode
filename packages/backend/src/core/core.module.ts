import { Module } from "@nestjs/common";

import { CoreNavModule } from "./nav/nav.module";
import {
  CoreSessionsModule,
  GlobalCoreSessionsModule
} from "./sessions/sessions.module";
import { AdminModule } from "./admin/admin.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";
import { CorePluginsModule } from "./plugins/plugins.module";
import { CoreLanguagesModule } from "./languages/languages.module";

@Module({
  imports: [
    AdminModule,
    CoreNavModule,
    GlobalCoreSessionsModule,
    CoreSessionsModule,
    GlobalCoreHelpersModule,
    CorePluginsModule,
    CoreLanguagesModule
  ]
})
export class CoreModule {}
