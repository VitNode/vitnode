import { Module } from '@nestjs/common';

import { ShowForumCategoriesResolver } from './show/show-forum_categories.resolver';
import { ShowForumCategoriesService } from './show/show-forum_categories.service';

@Module({
  providers: [ShowForumCategoriesResolver, ShowForumCategoriesService]
})
export class CategoriesForumModule {}
