import { AdminAuthGuards } from '@/utils';
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
  async admin__core_manifest_metadata__edit(
    @Args() args: EditAdminManifestMetadataObj,
  ): Promise<ShowAdminManifestMetadataObj> {
    return this.service.edit(args);
  }
}
