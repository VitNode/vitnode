import { Module } from "@nestjs/common";

import { ShowAdminEmailSettingsResolver } from "./settings/show/show.resolver";
import { ShowAdminEmailSettingsService } from "./settings/show/show.service";
import { EditAdminEmailSettingsResolver } from "./settings/edit/edit.resolver";
import { EditAdminEmailSettingsService } from "./settings/edit/edit.service";
import { TestAdminEmailSettingsService } from "./settings/test/test.service";
import { TestAdminEmailSettingsResolver } from "./settings/test/test.resolver";

@Module({
  providers: [
    ShowAdminEmailSettingsService,
    ShowAdminEmailSettingsResolver,
    EditAdminEmailSettingsResolver,
    EditAdminEmailSettingsService,
    TestAdminEmailSettingsService,
    TestAdminEmailSettingsResolver
  ]
})
export class AdminEmailModule {}
