import { Module } from "@nestjs/common";

import { CoreModule } from "./core/core.module";
import { ForumModule } from "./forum/forum.module";
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
