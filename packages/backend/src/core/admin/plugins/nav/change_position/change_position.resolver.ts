import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ChangePositionAdminNavPluginsService } from "./change_position.service";
import { ChangePositionAdminNavPluginsArgs } from "./dto/change_position.args";

import { AdminAuthGuards, OnlyForDevelopment } from "../../../../../utils";

@Resolver()
export class ChangePositionAdminNavPluginsResolver {
  constructor(private readonly service: ChangePositionAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__change_position(
    @Args() args: ChangePositionAdminNavPluginsArgs
  ): string {
    return this.service.changePosition(args);
  }
}
