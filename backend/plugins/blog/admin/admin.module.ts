import { Module } from "@nestjs/common";

import { CreateBlogCategoriesService } from "./categories/create/create.service";
import { CreateBlogCategoriesResolver } from "./categories/create/create.resolver";

@Module({
  providers: [CreateBlogCategoriesService, CreateBlogCategoriesResolver]
})
export class AdminBlogModule {}
