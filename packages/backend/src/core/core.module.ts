import { Module } from "@nestjs/common";

import { CoreNavModule } from "./nav/nav.module";
import {
  CoreSessionsModule,
  GlobalCoreSessionsModule
} from "./sessions/sessions.module";
import { AdminModule } from "./admin/admin.module";
import { GlobalCoreHelpersModule } from "./helpers/helpers.module";

@Module({
  imports: [
    AdminModule,
    CoreNavModule,
    GlobalCoreSessionsModule,
    CoreSessionsModule,
    GlobalCoreHelpersModule
  ]
})
export class CoreModule {}
