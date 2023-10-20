import { Module } from '@nestjs/common';

import { GeneralAdminSettingsResolver } from './general/general-admin_settings.resolver';
import { EditGeneralAdminSettingsService } from './general/edit/edit-general-admin_settings.service';

@Module({
  providers: [GeneralAdminSettingsResolver, EditGeneralAdminSettingsService]
})
export class AdminSettingsModule {}
