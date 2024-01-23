import { Module } from '@nestjs/common';

import { ForumModule } from './forum/forum.module';
import { CommerceModule } from './commerce/commerce.module';
// ! === IMPORT ===

@Module({
  imports: [
    ForumModule,
    CommerceModule
    // ! === MODULE ===
  ]
})
export class ModulesModule {}
