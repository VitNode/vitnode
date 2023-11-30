import { Module } from '@nestjs/common';

import { ShowForumCategoriesResolver } from './show/show-forum_forums.resolver';
import { ShowForumForumsService } from './show/show-forum_forums.service';
import { CreateForumForumsService } from './create/create-forum_forums.service';
import { CreateForumCategoriesResolver } from './create/create-forum-froums.resolver';

@Module({
  providers: [
    ShowForumCategoriesResolver,
    ShowForumForumsService,
    CreateForumForumsService,
    CreateForumCategoriesResolver
  ]
})
export class ForumsForumModule {}
