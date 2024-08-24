import { Module } from '@nestjs/common';

import { AdminAuthorizationSettingsModule } from './authorization/authorization.module';
import { AdminMainSettingsModule } from './main/general.module';

@Module({
  imports: [AdminMainSettingsModule, AdminAuthorizationSettingsModule],
})
export class AdminSettingsModule {}
