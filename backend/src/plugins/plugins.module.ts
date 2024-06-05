import { Module } from "@nestjs/common";

import { CoreModule } from "./core/core.module";
import { BlogModule } from "./blog/blog.module";
// ! === IMPORT ===

@Module({
  imports: [
    BlogModule,
    // ! === MODULE ===
    CoreModule
  ]
})
export class PluginsModule {}
