import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards, OnlyForDevelopment } from "vitnode-backend";

import { FilesAdminPluginsService } from "./files.service";
import { FilesAdminPluginsArgs } from "./dto/files.args";
import { FilesAdminPluginsObj } from "./dto/files.obj";

@Resolver()
export class FilesAdminPluginsResolver {
  constructor(private readonly service: FilesAdminPluginsService) {}

  @Query(() => FilesAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__files(
    @Args() args: FilesAdminPluginsArgs
  ): Promise<FilesAdminPluginsObj> {
    return this.service.check(args);
  }
}
