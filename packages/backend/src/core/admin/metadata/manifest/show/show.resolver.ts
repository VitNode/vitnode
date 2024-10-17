import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminManifestMetadataObj } from './show.dto';
import { ShowAdminManifestMetadataService } from './show.service';

@Resolver()
export class ShowAdminManifestMetadataResolver {
  constructor(private readonly service: ShowAdminManifestMetadataService) {}

  @Query(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_metadata',
  })
  admin__core_manifest_metadata__show(): ShowAdminManifestMetadataObj {
    return this.service.show();
  }
}
