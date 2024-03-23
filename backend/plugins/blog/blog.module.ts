import { Module } from "@nestjs/common";

import { AdminBlogModule } from "./admin/admin.module";

@Module({
  imports: [AdminBlogModule]
})
export class BlogModule {}
