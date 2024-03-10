import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CheckDownloadAdminPluginsService } from "./check.service";
import { CheckDownloadAdminPluginsArgs } from "./dto/check.args";
import { CheckDownloadAdminPluginsObj } from "./dto/check.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class CheckDownloadAdminPluginsResolver {
  constructor(private readonly service: CheckDownloadAdminPluginsService) {}

  @Query(() => CheckDownloadAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__download_check(
    @Args() args: CheckDownloadAdminPluginsArgs
  ): Promise<CheckDownloadAdminPluginsObj> {
    return await this.service.check(args);
  }
}
