import { Module } from '@nestjs/common';

import { ForumsForumModule } from './forums/forum_forums.module';
import { TopicsForumModule } from './topics/forum_topics.module';
import { PostsForumModule } from './posts/forum_topics.module';

@Module({
  imports: [ForumsForumModule, TopicsForumModule, PostsForumModule]
})
export class ForumModule {}
