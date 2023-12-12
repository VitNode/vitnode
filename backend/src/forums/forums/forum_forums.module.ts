import { Module } from '@nestjs/common';

import { ShowForumCategoriesResolver } from './show/show.resolver';
import { ShowForumForumsService } from './show/show.service';

@Module({
  providers: [ShowForumCategoriesResolver, ShowForumForumsService]
})
export class ForumsForumModule {}
