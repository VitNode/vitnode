import { Module } from "@nestjs/common";

import { ShowBlogCategoriesService } from "./show/show.service";
import { ShowBlogCategoriesResolver } from "./show/show.resolver";

@Module({
  providers: [ShowBlogCategoriesService, ShowBlogCategoriesResolver],
})
export class BlogCategoriesModule {}
