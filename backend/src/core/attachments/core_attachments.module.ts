import { Global, Module } from '@nestjs/common';

import { UploadCoreAttachmentsService } from './upload/upload-core_attachments.service';
import { DeleteCoreAttachmentsService } from './delete/delete-core_attachments.service';

@Global()
@Module({
  providers: [UploadCoreAttachmentsService, DeleteCoreAttachmentsService],
  exports: [UploadCoreAttachmentsService, DeleteCoreAttachmentsService]
})
export class CoreAttachmentsModule {}
