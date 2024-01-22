import { Module } from '@nestjs/common';

import { AdminCoreModule } from './core/core.module';
import { AdminForumModule } from './forum/forum.module';
import { AdminCommerceModule } from './commerce/commerce.module';
// ! === IMPORT ===

@Module({
  imports: [
    AdminCoreModule,
    AdminForumModule,
    AdminCommerceModule // ! === MODULE ===
  ]
})
export class AdminModule {}
