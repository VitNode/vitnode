import { Module } from "@nestjs/common";

import { ShowCorePluginsResolver } from "./show/show.resolver";
import { ShowCorePluginsService } from "./show/show.service";

@Module({
  providers: [ShowCorePluginsResolver, ShowCorePluginsService],
})
export class CorePluginsModule {}
