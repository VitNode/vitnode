import { Module } from "@nestjs/common";

import { DownloadFilesAdminController } from "./download/download.controller";
import { ShowAdminFilesResolver } from "./show/show.resolver";
import { ShowAdminFilesService } from "./show/show.service";

@Module({
  providers: [ShowAdminFilesResolver, ShowAdminFilesService],
  controllers: [DownloadFilesAdminController]
})
export class AdminFilesModule {}
