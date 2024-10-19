import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminManifestMetadataObj } from '../show/show.dto';
import { EditAdminManifestMetadataObj } from './edit.dto';
import { EditAdminManifestMetadataService } from './edit.service';

@Resolver()
export class EditAdminManifestMetadataResolver {
  constructor(private readonly service: EditAdminManifestMetadataService) {}

  @Mutation(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_metadata',
  })
  async admin__core_manifest_metadata__edit(
    @Args() args: EditAdminManifestMetadataObj,
  ): Promise<ShowAdminManifestMetadataObj> {
    return this.service.edit(args);
  }
}
