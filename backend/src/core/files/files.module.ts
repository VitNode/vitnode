import { Global, Module } from '@nestjs/common';

import { UploadCoreFilesService } from './upload/upload.service';
import { DeleteCoreFilesService } from './delete/delete.service';
import { DownloadFilesController } from './download/download.controller';

@Global()
@Module({
  providers: [UploadCoreFilesService, DeleteCoreFilesService],
  exports: [UploadCoreFilesService, DeleteCoreFilesService],
  controllers: [DownloadFilesController]
})
export class CoreFilesModule {}
