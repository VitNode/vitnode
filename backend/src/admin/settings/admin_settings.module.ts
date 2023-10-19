import { Module } from '@nestjs/common';

import { GeneralAdminSettingsResolver } from './general/general-admin_settings.resolver';
import { ShowGeneralAdminSettingsService } from './general/show/show-general-admin_settings.service';

@Module({
  providers: [GeneralAdminSettingsResolver, ShowGeneralAdminSettingsService]
})
export class AdminSettingsModule {}
