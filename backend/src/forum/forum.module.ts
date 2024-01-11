import { Module } from '@nestjs/common';

import { ForumsForumModule } from './forums/forums.module';
import { TopicsForumModule } from './topics/topics.module';
import { PostsForumModule } from './posts/topics.module';

@Module({
  imports: [ForumsForumModule, TopicsForumModule, PostsForumModule]
})
export class ForumModule {}
