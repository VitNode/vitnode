import { Module } from "@nestjs/common";

import { ShowAdminEmailSettingsResolver } from "./settings/show/show.resolver";
import { ShowAdminEmailSettingsService } from "./settings/show/show.service";

@Module({
  providers: [ShowAdminEmailSettingsService, ShowAdminEmailSettingsResolver]
})
export class AdminEmailModule {}
