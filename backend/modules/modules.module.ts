import { Module } from "@nestjs/common";

import { ForumModule } from "./forum/forum.module";
import { CoreModule } from "./core/core.module";
import { BlogsModule } from "./blogs/blogs.module";
// ! === IMPORT ===

@Module({
  imports: [
    CoreModule,
    ForumModule,
    BlogsModule
    // ! === MODULE ===
  ]
})
export class ModulesModule {}
