import { Module } from '@nestjs/common';

import { ShowPostsForumsResolver } from './show/show.resolver';
import { ShowPostsForumsService } from './show/show.service';

@Module({
  providers: [ShowPostsForumsResolver, ShowPostsForumsService]
})
export class PostsForumModule {}
