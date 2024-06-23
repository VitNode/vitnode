import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminPluginsService } from "./edit.service";
import { ShowAdminPlugins } from "../show/dto/show.obj";
import { EditAdminPluginsArgs } from "./dto/edit.args";

import { AdminAuthGuards, OnlyForDevelopment } from "../../../../utils";

@Resolver()
export class EditAdminPluginsResolver {
  constructor(private readonly service: EditAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__edit(
    @Args() args: EditAdminPluginsArgs,
  ): Promise<ShowAdminPlugins> {
    return this.service.edit(args);
  }
}
