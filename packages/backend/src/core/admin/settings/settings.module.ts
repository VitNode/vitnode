import { Module } from '@nestjs/common';

import { AdminMainSettingsModule } from './main/general.module';
import { AdminAuthorizationSettingsModule } from './authorization/authorization.module';

@Module({
  imports: [AdminMainSettingsModule, AdminAuthorizationSettingsModule],
})
export class AdminSettingsModule {}
