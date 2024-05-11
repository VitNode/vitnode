import { Module } from "@nestjs/common";

import { AdminBlogModule } from "./admin/admin.module";
import { BlogCategoriesModule } from "./categories/categories.module";

@Module({
  imports: [AdminBlogModule, BlogCategoriesModule]
})
export class BlogModule {}
