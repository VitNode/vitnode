import { Module } from "@nestjs/common";

import { ShowAdminPluginsService } from "./show/show.service";
import { ShowAdminPluginsResolver } from "./show/show.resolver";
import { CreateAdminPluginsResolver } from "./create/create.resolver";
import { CreateAdminPluginsService } from "./create/create.service";
import { DeleteAdminPluginsResolver } from "./delete/delete.resolver";
import { DeleteAdminPluginsService } from "./delete/delete.service";
import { CreateFilesAdminPluginsService } from "./helpers/files/create/create-files.service";
import { ChangeFilesAdminPluginsService } from "./helpers/files/change/change.service";
import { DownloadAdminPluginsResolver } from "./download/download.resolver";
import { DownloadAdminPluginsService } from "./download/download.service";
import { UploadAdminPluginsResolver } from "./upload/upload.resolver";
import { UploadAdminPluginsService } from "./upload/upload.service";
import { FilesAdminPluginsService } from "./files/files.service";
import { FilesAdminPluginsResolver } from "./files/files.resolver";
import { EditAdminPluginsResolver } from "./edit/edit.resolver";
import { EditAdminPluginsService } from "./edit/edit.service";
import { AdminNavPluginsModule } from "./nav/nav-plugins.module";

export interface ConfigPlugin {
  author: string;
  author_url: string;
  code: string;
  name: string;
  support_url: string;
  version: string;
  version_code: number;
  description?: string;
}

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
