import { Module } from "@nestjs/common";

import { ForumModule } from "./forum/forum.module";
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./admin/admin.module";
// ! === IMPORT ===

@Module({
  imports: [
    CoreModule,
    AdminModule,
    ForumModule
    // ! === MODULE ===
  ]
})
export class ModulesModule {}
