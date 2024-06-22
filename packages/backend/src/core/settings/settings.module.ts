import { Module } from "@nestjs/common";

import { ShowSettingsService } from "./show/show.service";
import { ShowCoreSettingsResolver } from "./show/show.resolver";
import { ShowAdminManifestMetadataObj } from "../admin/metadata/manifest/show/dto/show.obj";

export interface ManifestWithLang extends ShowAdminManifestMetadataObj {
  description: string;
}

@Module({
  providers: [ShowSettingsService, ShowCoreSettingsResolver],
})
export class CoreSettingsModule {}
