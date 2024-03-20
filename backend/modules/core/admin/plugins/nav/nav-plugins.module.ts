import { Module } from "@nestjs/common";

import { ShowAdminNavPluginsService } from "./show/show.service";
import { ShowAdminNavPluginsResolver } from "./show/show.resolver";

@Module({
  providers: [ShowAdminNavPluginsService, ShowAdminNavPluginsResolver]
})
export class AdminNavPluginsModule {}
