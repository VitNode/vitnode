import { Module } from '@nestjs/common';

import { CreateForumForumsService } from './forums/create/create.service';
import { CreateForumCategoriesResolver } from './forums/create/create.resolver';
import { ChangePositionForumCategoriesResolver } from './forums/change_position/change_position.resolver';
import { ChangePositionForumForumsService } from './forums/change_position/change_position.service';

@Module({
  providers: [
    CreateForumForumsService,
    CreateForumCategoriesResolver,
    ChangePositionForumCategoriesResolver,
    ChangePositionForumForumsService
  ]
})
export class AdminForumModule {}
