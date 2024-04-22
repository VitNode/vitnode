import { Global, Module } from "@nestjs/common";

import { UploadCoreFilesService } from "./helpers/upload/upload.service";
import { DeleteCoreFilesService } from "./helpers/delete/delete.service";
import { DownloadFilesController } from "./download/download.controller";
import { AuthorizationAdminSessionsService } from "../admin/sessions/authorization/authorization.service";

@Global()
@Module({
  providers: [
    UploadCoreFilesService,
    DeleteCoreFilesService,
    AuthorizationAdminSessionsService
  ],
  exports: [UploadCoreFilesService, DeleteCoreFilesService],
  controllers: [DownloadFilesController]
})
export class CoreFilesModule {}
