import { Module } from '@nestjs/common';

import { DeleteCoreEditorResolver } from './delete/delete.resolver';
import { DeleteCoreEditorService } from './delete/delete.service';
import { UploadCoreEditorResolver } from './upload/upload.resolver';
import { UploadCoreEditorService } from './upload/upload.service';

@Module({
  providers: [
    UploadCoreEditorService,
    UploadCoreEditorResolver,
    DeleteCoreEditorResolver,
    DeleteCoreEditorService,
  ],
})
export class CoreEditorModule {}
