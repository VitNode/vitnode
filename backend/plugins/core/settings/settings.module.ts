import { Module } from "@nestjs/common";

import { ShowSettingsService } from "./show/show.service";
import { ShowCoreSettingsResolver } from "./show/show.resolver";

@Module({
  providers: [ShowSettingsService, ShowCoreSettingsResolver]
})
export class CoreSettingsModule {}
