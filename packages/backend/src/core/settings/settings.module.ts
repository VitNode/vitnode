import { Module } from '@nestjs/common';

import { ShowAdminManifestMetadataObj } from '../admin/metadata/manifest/show/show.dto';
import { ShowCoreSettingsResolver } from './show/show.resolver';
import { ShowSettingsService } from './show/show.service';

export interface ManifestWithLang extends ShowAdminManifestMetadataObj {
  description: string;
}

@Module({
  providers: [ShowSettingsService, ShowCoreSettingsResolver],
})
export class CoreSettingsModule {}
