import { Module } from '@nestjs/common';

import { GeneralAdminSettingsResolver } from './general/edit/edit.resolver';
import { EditGeneralAdminSettingsService } from './general/edit/edit.service';

@Module({
  providers: [GeneralAdminSettingsResolver, EditGeneralAdminSettingsService]
})
export class AdminSettingsModule {}
