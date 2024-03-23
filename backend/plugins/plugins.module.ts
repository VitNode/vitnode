import { Module } from "@nestjs/common";

import { ForumModule } from "./forum/forum.module";
import { CoreModule } from "./core/core.module";
import { BlogModule } from "./blog/blog.module";
// ! === IMPORT ===

@Module({
  imports: [
    CoreModule,
    ForumModule,
    BlogModule
    // ! === MODULE ===
  ]
})
export class PluginsModule {}
