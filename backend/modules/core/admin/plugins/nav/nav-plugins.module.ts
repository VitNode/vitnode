import { Module } from "@nestjs/common";

import { ShowAdminNavPluginsService } from "./show/show.service";
import { ShowAdminNavPluginsResolver } from "./show/show.resolver";
import { CreateAdminNavPluginsService } from "./create/create.service";
import { CreateAdminNavPluginsResolver } from "./create/create.resolver";

@Module({
  providers: [
    ShowAdminNavPluginsService,
    ShowAdminNavPluginsResolver,
    CreateAdminNavPluginsService,
    CreateAdminNavPluginsResolver
  ]
})
export class AdminNavPluginsModule {}
