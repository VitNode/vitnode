import { Module } from '@nestjs/common';

import { AdminCoreModule } from './core/admin_core.module';
import { AdminForumModule } from './forum/admin_forum.module';

@Module({
  imports: [AdminCoreModule, AdminForumModule]
})
export class AdminModule {}
