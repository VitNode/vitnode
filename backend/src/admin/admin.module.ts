import { Module } from '@nestjs/common';

import { AdminSettingsModule } from './settings/admin_settings.module';
import { AdminSessionsModule } from './sessions/admin_sessions.module';

@Module({
  imports: [AdminSettingsModule, AdminSessionsModule]
})
export class AdminModule {}
