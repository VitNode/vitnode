import { Module } from '@nestjs/common';

import { ForumsForumModule } from './categories/forum_forums.module';

@Module({
  imports: [ForumsForumModule]
})
export class ForumModule {}
