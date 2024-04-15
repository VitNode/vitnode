import { Module } from "@nestjs/common";

import { EditAdminGeneralSettingsService } from "./edit/edit.service";
import { EditAdminGeneralSettingsResolver } from "./edit/edit.resolver";

@Module({
  providers: [EditAdminGeneralSettingsService, EditAdminGeneralSettingsResolver]
})
export class AdminGeneralSettingsModule {}
