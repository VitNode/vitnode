import { Module } from '@nestjs/common';

import { AdminSettingsModule } from './settings/admin_settings.module';
import { AdminSessionsModule } from './sessions/admin_sessions.module';
import { AdminInstallModule } from './install/admin_install.module';

@Module({
  imports: [AdminSettingsModule, AdminSessionsModule, AdminInstallModule]
})
export class AdminModule {}
