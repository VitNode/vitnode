import { Module } from "@nestjs/common";

import { ForumModule } from "./forum/forum.module";
import { CoreModule } from "./core/core.module";
import { BlogModule } from "./blog/blog.module";
// ! === IMPORT ===

@Module({
  imports: [
    ForumModule,
    BlogModule,
    // ! === MODULE ===
    CoreModule
  ]
})
export class PluginsModule {}
