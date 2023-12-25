import { Module } from '@nestjs/common';

import { AdminSettingsModule } from './settings/admin_settings.module';
import { AdminSessionsModule } from './sessions/admin_sessions.module';
import { AdminInstallModule } from './install/admin_install.module';
import { AdminGroupsModule } from './groups/admin_groups.module';
import { AdminMembersModule } from './members/core_members.module';
import { AdminStaffModule } from './staff/admin_staff.module';

@Module({
  imports: [
    AdminSettingsModule,
    AdminSessionsModule,
    AdminInstallModule,
    AdminGroupsModule,
    AdminMembersModule,
    AdminStaffModule
  ]
})
export class AdminCoreModule {}
