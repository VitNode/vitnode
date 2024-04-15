import { Module } from "@nestjs/common";

import { EditAdminMainSettingsService } from "./edit/edit.service";
import { EditAdminMainSettingsResolver } from "./edit/edit.resolver";

@Module({
  providers: [EditAdminMainSettingsService, EditAdminMainSettingsResolver]
})
export class AdminMainSettingsModule {}
