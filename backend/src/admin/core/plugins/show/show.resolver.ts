import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminPluginsService } from "./show.service";
import { ShowAdminPluginsObj } from "./dto/show.obj";
import { ShowAdminPluginsArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class ShowAdminPluginsResolver {
  constructor(private readonly service: ShowAdminPluginsService) {}

  @Query(() => ShowAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__show(
    @Args() args: ShowAdminPluginsArgs
  ): Promise<ShowAdminPluginsObj> {
    return await this.service.show(args);
  }
}
