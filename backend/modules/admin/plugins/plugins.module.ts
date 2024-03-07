import { Module } from "@nestjs/common";

import { ShowAdminPluginsService } from "./show/show.service";
import { ShowAdminPluginsResolver } from "./show/show.resolver";
import { CreateAdminPluginsResolver } from "./create/create.resolver";
import { CreateAdminPluginsService } from "./create/create.service";
import { DeleteAdminPluginsResolver } from "./delete/delete.resolver";
import { DeleteAdminPluginsService } from "./delete/delete.service";
import { CreateFilesAdminPluginsService } from "./helpers/files/create/create-files.service";
import { ChangeFilesAdminPluginsService } from "./helpers/files/change/change.service";
import { DeleteFilesAdminPluginsService } from "./helpers/files/delete/delete.service";

@Module({
  providers: [
    ShowAdminPluginsService,
    ShowAdminPluginsResolver,
    CreateAdminPluginsResolver,
    CreateAdminPluginsService,
    DeleteAdminPluginsResolver,
    DeleteAdminPluginsService,
    CreateFilesAdminPluginsService,
    ChangeFilesAdminPluginsService,
    DeleteFilesAdminPluginsService
  ]
})
export class AdminPluginsModule {}
