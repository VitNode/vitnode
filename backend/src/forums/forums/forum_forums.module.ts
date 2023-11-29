import { Module } from '@nestjs/common';

import { ShowForumCategoriesResolver } from './show/show-forum_forums.resolver';
import { ShowForumForumsService } from './show/show-forum_forums.service';

@Module({
  providers: [ShowForumCategoriesResolver, ShowForumForumsService]
})
export class ForumsForumModule {}
