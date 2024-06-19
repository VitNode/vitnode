import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { FilesAdminPluginsService } from "./files.service";
import { FilesAdminPluginsArgs } from "./dto/files.args";
import { FilesAdminPluginsObj } from "./dto/files.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { OnlyForDevelopment } from "@/utils/guards/dev.guard";

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
