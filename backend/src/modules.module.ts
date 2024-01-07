import { Module } from '@nestjs/common';

import { ForumModule } from './forum/forum.module';

@Module({
  imports: [ForumModule]
})
export class ModulesModule {}
