import { Module } from '@nestjs/common';

import { EditAdminManifestMetadataResolver } from './manifest/edit/edit.resolver';
import { EditAdminManifestMetadataService } from './manifest/edit/edit.service';
import { ShowAdminManifestMetadataResolver } from './manifest/show/show.resolver';
import { ShowAdminManifestMetadataService } from './manifest/show/show.service';

@Module({
  providers: [
    ShowAdminManifestMetadataService,
    ShowAdminManifestMetadataResolver,
    EditAdminManifestMetadataResolver,
    EditAdminManifestMetadataService,
  ],
})
export class AdminMetadataModule {}
