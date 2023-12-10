import { Global, Module } from '@nestjs/common';

import { UploadCoreAttachmentsService } from './upload/upload.service';
import { DeleteCoreAttachmentsService } from './delete/delete.service';

@Global()
@Module({
  providers: [UploadCoreAttachmentsService, DeleteCoreAttachmentsService],
  exports: [UploadCoreAttachmentsService, DeleteCoreAttachmentsService]
})
export class CoreAttachmentsModule {}
