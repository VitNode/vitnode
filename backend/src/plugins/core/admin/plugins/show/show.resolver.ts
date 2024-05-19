import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminPluginsService } from "./show.service";
import { ShowAdminPluginsObj } from "./dto/show.obj";
import { ShowAdminPluginsArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class ShowAdminPluginsResolver {
  constructor(private readonly service: ShowAdminPluginsService) {}

  @Query(() => ShowAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__show(
    @Args() args: ShowAdminPluginsArgs
  ): Promise<ShowAdminPluginsObj> {
    return this.service.show(args);
  }
}
