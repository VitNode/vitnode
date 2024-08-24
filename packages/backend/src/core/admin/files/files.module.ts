import { Module } from '@nestjs/common';

import { DeleteAdminFilesResolver } from './delete/delete.resolver';
import { DeleteAdminFilesService } from './delete/delete.service';
import { DownloadFilesAdminController } from './download/download.controller';
import { ShowAdminFilesResolver } from './show/show.resolver';
import { ShowAdminFilesService } from './show/show.service';

@Module({
  providers: [
    ShowAdminFilesResolver,
    ShowAdminFilesService,
    DeleteAdminFilesResolver,
    DeleteAdminFilesService,
  ],
  controllers: [DownloadFilesAdminController],
})
export class AdminFilesModule {}
