import { Module } from '@nestjs/common';

import { AdminAuthorizationSettingsModule } from './authorization/authorization.module';
import { AdminMainSettingsModule } from './main/main.module';
import { AdminTermsSettingsModule } from './terms/terms.module';

@Module({
  imports: [
    AdminMainSettingsModule,
    AdminAuthorizationSettingsModule,
    AdminTermsSettingsModule,
  ],
})
export class AdminSettingsModule {}
