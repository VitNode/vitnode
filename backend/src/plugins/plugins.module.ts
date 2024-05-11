import { Module } from "@nestjs/common";

import { CoreModule } from "./core/core.module";
import { BlogModule } from "./blog/blog.module";
import { ForumModule } from "./forum/forum.module";
// ! === IMPORT ===

@Module({
  imports: [
    BlogModule,
    ForumModule,
    // ! === MODULE ===
    CoreModule
  ]
})
export class PluginsModule {}
