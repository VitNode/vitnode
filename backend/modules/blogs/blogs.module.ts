import { Module } from "@nestjs/common";

import { AdminBlogsModule } from "./admin/admin.module";

@Module({
  imports: [AdminBlogsModule]
})
export class BlogsModule {}
