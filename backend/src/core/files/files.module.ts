import { Global, Module } from '@nestjs/common';

import { UploadCoreFilesService } from './upload/upload.service';
import { DeleteCoreFilesService } from './delete/delete.service';

@Global()
@Module({
  providers: [UploadCoreFilesService, DeleteCoreFilesService],
  exports: [UploadCoreFilesService, DeleteCoreFilesService]
})
export class CoreFilesModule {}
