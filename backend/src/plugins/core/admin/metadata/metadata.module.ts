import { Module } from "@nestjs/common";

import { ShowAdminManifestMetadataService } from "./manifest/show/show.service";
import { ShowAdminManifestMetadataResolver } from "./manifest/show/show.resolver";
import { EditAdminManifestMetadataResolver } from "./manifest/edit/edit.resolver";
import { EditAdminManifestMetadataService } from "./manifest/edit/edit.service";

@Module({
  providers: [
    ShowAdminManifestMetadataService,
    ShowAdminManifestMetadataResolver,
    EditAdminManifestMetadataResolver,
    EditAdminManifestMetadataService
  ]
})
export class AdminMetadataModule {}
