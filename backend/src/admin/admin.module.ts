import { Module } from '@nestjs/common';

import { AdminCoreModule } from './core/core.module';
import { AdminForumModule } from './forum/forum.module';

@Module({
  imports: [AdminCoreModule, AdminForumModule]
})
export class AdminModule {}
