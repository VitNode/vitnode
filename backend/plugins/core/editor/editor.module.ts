import { Module } from "@nestjs/common";

import { UploadCoreEditorService } from "./upload/upload.service";
import { UploadCoreEditorResolver } from "./upload/upload.resolver";

@Module({
  providers: [UploadCoreEditorService, UploadCoreEditorResolver]
})
export class CoreEditorModule {}
