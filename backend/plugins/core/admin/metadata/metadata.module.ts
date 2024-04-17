import { Module } from "@nestjs/common";

import { ShowAdminManifestMetadataService } from "./manifest/show/show.service";
import { ShowAdminManifestMetadataResolver } from "./manifest/show/show.resolver";

@Module({
  providers: [
    ShowAdminManifestMetadataService,
    ShowAdminManifestMetadataResolver
  ]
})
export class AdminMetadataModule {}
