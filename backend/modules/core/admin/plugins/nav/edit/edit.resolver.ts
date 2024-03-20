import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminNavPluginsService } from "./edit.service";
import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { EditCreateAdminNavPluginsArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class EditAdminNavPluginsResolver {
  constructor(private readonly service: EditAdminNavPluginsService) {}

  @Mutation(() => ShowAdminNavPluginsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__nav__edit(
    @Args() args: EditCreateAdminNavPluginsArgs
  ): Promise<ShowAdminNavPluginsObj> {
    return await this.service.edit(args);
  }
}
