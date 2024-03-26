import { Module } from "@nestjs/common";

import { ShowBlogCategoriesService } from "./show/show.service";

@Module({
  providers: [ShowBlogCategoriesService]
})
export class BlogCategoriesModule {}
