import { Module } from '@nestjs/common';

import { ShowForumCategoriesResolver } from './show/show-forum_forums.resolver';
import { ShowForumForumsService } from './show/show-forum_forums.service';
import { CreateForumForumsService } from './create/create-forum_forums.service';
import { CreateForumCategoriesResolver } from './create/create-forum-froums.resolver';
import { ChangePositionForumCategoriesResolver } from './change_position/change_position-forum_forums.resolver';
import { ChangePositionForumForumsService } from './change_position/change_position-forum_forums.service';

@Module({
  providers: [
    ShowForumCategoriesResolver,
    ShowForumForumsService,
    CreateForumForumsService,
    CreateForumCategoriesResolver,
    ChangePositionForumCategoriesResolver,
    ChangePositionForumForumsService
  ]
})
export class ForumsForumModule {}
