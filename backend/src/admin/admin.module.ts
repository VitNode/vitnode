import { Module } from '@nestjs/common';

import { AdminSettingsModule } from './settings/admin_settings.module';
import { AdminSessionsModule } from './sessions/admin_sessions.module';
import { AdminInstallModule } from './install/admin_install.module';
import { AdminGroupsModule } from './groups/admin_groups.module';

@Module({
  imports: [AdminSettingsModule, AdminSessionsModule, AdminInstallModule, AdminGroupsModule]
})
export class AdminModule {}
