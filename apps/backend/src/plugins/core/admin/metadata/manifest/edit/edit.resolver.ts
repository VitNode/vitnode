import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { EditAdminManifestMetadataService } from "./edit.service";
import { EditAdminManifestMetadataObj } from "./dto/edit.args";
import { ShowAdminManifestMetadataObj } from "../show/dto/show.obj";

@Resolver()
export class EditAdminManifestMetadataResolver {
  constructor(private readonly service: EditAdminManifestMetadataService) {}

  @Mutation(() => ShowAdminManifestMetadataObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_manifest_metadata__edit(
    @Args() args: EditAdminManifestMetadataObj
  ): Promise<ShowAdminManifestMetadataObj> {
    return this.service.edit(args);
  }
}
