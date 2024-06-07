import { Module } from "@nestjs/common";

import { ShowAdminEmailSettingsResolver } from "./settings/show/show.resolver";
import { ShowAdminEmailSettingsService } from "./settings/show/show.service";
import { EditAdminEmailSettingsResolver } from "./settings/edit/edit.resolver";
import { EditAdminEmailSettingsService } from "./settings/edit/edit.service";

@Module({
  providers: [ShowAdminEmailSettingsService, ShowAdminEmailSettingsResolver, EditAdminEmailSettingsResolver, EditAdminEmailSettingsService]
})
export class AdminEmailModule {}
