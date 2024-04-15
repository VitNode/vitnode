import { Module } from "@nestjs/common";

import { AdminGeneralSettingsModule } from "./general/general.module";

@Module({
  imports: [AdminGeneralSettingsModule]
})
export class AdminSettingsModule {}
