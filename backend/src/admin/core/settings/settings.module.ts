import { Module } from "@nestjs/common";

import { EditGeneralAdminSettingsResolver } from "./general/edit/edit.resolver";
import { EditGeneralAdminSettingsService } from "./general/edit/edit.service";
import { ShowGeneralAdminSettingsResolver } from "./general/show/show.resolver";
import { ShowGeneralAdminSettingsService } from "./general/show/show.service";

@Module({
  providers: [
    EditGeneralAdminSettingsResolver,
    EditGeneralAdminSettingsService,
    ShowGeneralAdminSettingsResolver,
    ShowGeneralAdminSettingsService
  ]
})
export class AdminSettingsModule {}
