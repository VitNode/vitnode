import { Module } from '@nestjs/common';

import { AdminSettingsModule } from './settings/settings.module';
import { AdminSessionsModule } from './sessions/sessions.module';
import { AdminInstallModule } from './install/install.module';
import { AdminGroupsModule } from './groups/groups.module';
import { AdminMembersModule } from './members/members.module';
import { AdminStaffModule } from './staff/staff.module';
import { AdminPluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    AdminSettingsModule,
    AdminSessionsModule,
    AdminInstallModule,
    AdminGroupsModule,
    AdminMembersModule,
    AdminStaffModule,
    AdminPluginsModule
  ]
})
export class AdminCoreModule {}
