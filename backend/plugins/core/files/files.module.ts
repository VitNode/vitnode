import { Global, Module } from "@nestjs/common";

import { UploadCoreFilesService } from "./helpers/upload/upload.service";
import { DeleteCoreFilesService } from "./helpers/delete/delete.service";
import { AuthorizationAdminSessionsService } from "../admin/sessions/authorization/authorization.service";
import { ShowCoreFilesService } from "./show/show.service";
import { ShowCoreFilesResolver } from "./show/show.resolver";
import { CoreFilesCron } from "./files.cron";
import { DownloadSecureFilesController } from "./download/download.controller";

@Module({
  providers: [ShowCoreFilesService, ShowCoreFilesResolver, CoreFilesCron]
})
export class CoreFilesModule {}

@Global()
@Module({
  providers: [
    UploadCoreFilesService,
    DeleteCoreFilesService,
    AuthorizationAdminSessionsService
  ],
  exports: [UploadCoreFilesService, DeleteCoreFilesService],
  controllers: [DownloadSecureFilesController]
})
export class CoreFilesModuleGlobal {}
