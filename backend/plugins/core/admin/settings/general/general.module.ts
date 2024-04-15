import { Module } from "@nestjs/common";

import { EditAdminGeneralSettingsService } from "./edit/edit.service";

@Module({
  providers: [EditAdminGeneralSettingsService]
})
export class AdminGeneralSettingsModule {}
