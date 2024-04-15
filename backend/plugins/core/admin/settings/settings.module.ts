import { Module } from "@nestjs/common";

import { AdminMainSettingsModule } from "./main/general.module";

@Module({
  imports: [AdminMainSettingsModule]
})
export class AdminSettingsModule {}
