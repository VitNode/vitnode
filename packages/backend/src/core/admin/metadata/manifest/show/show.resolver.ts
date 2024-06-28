import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminManifestMetadataService } from './show.service';
import { ShowAdminManifestMetadataObj } from './dto/show.obj';

import { AdminAuthGuards } from '../../../../../utils';

@Resolver()
export class ShowAdminManifestMetadataResolver {
  constructor(private readonly service: ShowAdminManifestMetadataService) {}

  @Query(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  admin__core_manifest_metadata__show(): ShowAdminManifestMetadataObj {
    return this.service.show();
  }
}
