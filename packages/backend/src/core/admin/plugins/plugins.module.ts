import { Module } from "@nestjs/common";

import { AdminNavPluginsModule } from "./nav/nav-plugins.module";
import { CreateAdminPluginsService } from "./create/create.service";
import { CreateAdminPluginsResolver } from "./create/create.resolver";
import { ShowAdminPluginsService } from "./show/show.service";
import { ShowAdminPluginsResolver } from "./show/show.resolver";
import { DeleteAdminPluginsResolver } from "./delete/delete.resolver";
import { DeleteAdminPluginsService } from "./delete/delete.service";
import { CreateFilesAdminPluginsService } from "./helpers/files/create/create-files.service";
import { ChangeFilesAdminPluginsService } from "./helpers/files/change/change.service";
import { EditAdminPluginsResolver } from "./edit/edit.resolver";
import { EditAdminPluginsService } from "./edit/edit.service";
import { DownloadAdminPluginsResolver } from "./download/download.resolver";
import { DownloadAdminPluginsService } from "./download/download.service";
import { UploadAdminPluginsResolver } from "./upload/upload.resolver";
import { UploadAdminPluginsService } from "./upload/upload.service";
import { FilesAdminPluginsService } from "./files/files.service";
import { FilesAdminPluginsResolver } from "./files/files.resolver";

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
    DownloadAdminPluginsResolver,
    DownloadAdminPluginsService,
    UploadAdminPluginsResolver,
    UploadAdminPluginsService,
    FilesAdminPluginsService,
    FilesAdminPluginsResolver,
    EditAdminPluginsResolver,
    EditAdminPluginsService
  ],
  imports: [AdminNavPluginsModule]
})
export class AdminPluginsModule {}
