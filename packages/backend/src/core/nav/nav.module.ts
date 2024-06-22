import { Module } from "@nestjs/common";

import { ShowCoreNavResolver } from "./show/show.resolver";
import { ShowCoreNavService } from "./show/show.service";

@Module({
  providers: [ShowCoreNavResolver, ShowCoreNavService],
})
export class CoreNavModule {}
