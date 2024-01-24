import { Module } from '@nestjs/common';

import { ForumModule } from './forum/forum.module';
// ! === IMPORT ===

@Module({
  imports: [
    ForumModule
    // ! === MODULE ===
  ]
})
export class ModulesModule {}
