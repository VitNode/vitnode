import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowAdminManifestMetadataObj } from './dto/show.obj';
import { ShowAdminManifestMetadataService } from './show.service';

@Resolver()
export class ShowAdminManifestMetadataResolver {
  constructor(private readonly service: ShowAdminManifestMetadataService) {}

  @Query(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  admin__core_manifest_metadata__show(): ShowAdminManifestMetadataObj {
    return this.service.show();
  }
}
