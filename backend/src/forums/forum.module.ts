import { Module } from '@nestjs/common';

import { CategoriesForumModule } from './categories/forum_categories.module';

@Module({
  imports: [CategoriesForumModule]
})
export class ForumModule {}
