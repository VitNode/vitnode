import { Module } from "@nestjs/common";

import { UploadCoreEditorService } from "./upload/upload.service";
import { UploadCoreEditorResolver } from "./upload/upload.resolver";
import { DeleteCoreEditorResolver } from "./delete/delete.resolver";
import { DeleteCoreEditorService } from "./delete/delete.service";

@Module({
  providers: [
    UploadCoreEditorService,
    UploadCoreEditorResolver,
    DeleteCoreEditorResolver,
    DeleteCoreEditorService
  ]
})
export class CoreEditorModule {}
