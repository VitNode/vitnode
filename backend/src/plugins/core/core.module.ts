import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import {
  CoreSessionsModule,
  GlobalCoreSessionsModule
} from "./sessions/sessions.module";
import { CoreSettingsModule } from "./settings/settings.module";
import { CoreFilesModule, GlobalCoreFilesModule } from "./files/files.module";

@Module({
  imports: [
    AdminModule,
    GlobalCoreSessionsModule,
    CoreSessionsModule,
    CoreSettingsModule,
    GlobalCoreFilesModule,
    CoreFilesModule
  ]
})
export class CoreModule {}
