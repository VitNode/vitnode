import { Global, Module } from '@nestjs/common';

import { UploadCoreAttachmentsService } from './upload/upload-core_attachments.service';

@Global()
@Module({
  providers: [UploadCoreAttachmentsService],
  exports: [UploadCoreAttachmentsService]
})
export class CoreAttachmentsModule {}
