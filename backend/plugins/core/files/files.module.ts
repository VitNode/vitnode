import { Global, Module } from "@nestjs/common";

import { UploadCoreFilesService } from "./upload/upload.service";
import { DeleteCoreFilesService } from "./delete/delete.service";
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
