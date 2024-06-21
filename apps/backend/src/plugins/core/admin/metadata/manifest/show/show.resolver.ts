import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { ShowAdminManifestMetadataService } from "./show.service";
import { ShowAdminManifestMetadataObj } from "./dto/show.obj";

@Resolver()
export class ShowAdminManifestMetadataResolver {
  constructor(private readonly service: ShowAdminManifestMetadataService) {}

  @Query(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  admin__core_manifest_metadata__show(): ShowAdminManifestMetadataObj {
    return this.service.show();
  }
}
