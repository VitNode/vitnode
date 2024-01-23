import { Module } from '@nestjs/common';

import { AdminCoreModule } from './core/core.module';
import { AdminForumModule } from './forum/forum.module';
// ! === IMPORT ===

@Module({
  imports: [
    AdminCoreModule,
    AdminForumModule
    // ! === MODULE ===
  ]
})
export class AdminModule {}
