import { Module } from "@nestjs/common";

import { ShowAdminPluginsService } from "./show/show.service";
import { ShowAdminPluginsResolver } from "./show/show.resolver";
import { CreateAdminPluginsResolver } from "./create/create.resolver";
import { CreateAdminPluginsService } from "./create/create.service";
import { DeleteAdminPluginsResolver } from "./delete/delete.resolver";
import { DeleteAdminPluginsService } from "./delete/delete.service";
import { CreateFilesCreateAdminPluginsService } from "./create/files/create/create-files.service";
import { ChangeFilesCreateAdminPluginsService } from "./create/files/change/change.service";

@Module({
  providers: [
    ShowAdminPluginsService,
    ShowAdminPluginsResolver,
    CreateAdminPluginsResolver,
    CreateAdminPluginsService,
    DeleteAdminPluginsResolver,
    DeleteAdminPluginsService,
    CreateFilesCreateAdminPluginsService,
    ChangeFilesCreateAdminPluginsService
  ]
})
export class AdminPluginsModule {}
