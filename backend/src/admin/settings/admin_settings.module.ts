import { Module } from '@nestjs/common';

import { GeneralAdminSettingsResolver } from './general/general-admin_settings.resolver';

@Module({
  providers: [GeneralAdminSettingsResolver]
})
export class AdminSettingsModule {}
