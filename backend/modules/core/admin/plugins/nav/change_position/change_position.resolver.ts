import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ChangePositionAdminNavPluginsService } from "./change_position.service";
import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class ChangePositionAdminNavPluginsResolver {
  constructor(private readonly service: ChangePositionAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__nav__change_position(
    @Args() args: ChangePositionAdminNavPluginsArgs
  ): Promise<string> {
    return await this.service.changePosition(args);
  }
}
