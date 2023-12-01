import { Module } from '@nestjs/common';

import { ForumsForumModule } from './forums/forum_forums.module';

@Module({
  imports: [ForumsForumModule]
})
export class ForumModule {}
