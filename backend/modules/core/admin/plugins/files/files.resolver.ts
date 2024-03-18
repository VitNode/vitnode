import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { FilesAdminPluginsService } from "./files.service";
import { FilesAdminPluginsArgs } from "./dto/files.args";
import { FilesAdminPluginsObj } from "./dto/files.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class FilesAdminPluginsResolver {
  constructor(private readonly service: FilesAdminPluginsService) {}

  @Query(() => FilesAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__files(
    @Args() args: FilesAdminPluginsArgs
  ): Promise<FilesAdminPluginsObj> {
    return await this.service.check(args);
  }
}
