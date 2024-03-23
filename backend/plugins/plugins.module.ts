import { Module } from "@nestjs/common";

import { ForumModule } from "./forum/forum.module";
import { CoreModule } from "./core/core.module";
// ! === IMPORT ===

@Module({
  imports: [
    CoreModule,
    ForumModule
    // ! === MODULE ===
  ]
})
export class PluginsModule {}
