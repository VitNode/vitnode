import { Module } from "@nestjs/common";

import { CoreModule } from "./core/core.module";

// ! === IMPORT ===

@Module({
  imports: [
    // ! === MODULE ===
    CoreModule
  ]
})
export class PluginsModule {}
