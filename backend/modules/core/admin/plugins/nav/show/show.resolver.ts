import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminNavPluginsArgs } from "./dto/show.args";
import { ShowAdminNavPluginsService } from "./show.service";
import { ShowAdminNavPluginsObj } from "./dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class ShowAdminNavPluginsResolver {
  constructor(private readonly service: ShowAdminNavPluginsService) {}

  @Query(() => [ShowAdminNavPluginsObj])
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__nav__show(
    @Args() args: ShowAdminNavPluginsArgs
  ): Promise<ShowAdminNavPluginsObj[]> {
    return await this.service.show(args);
  }
}
