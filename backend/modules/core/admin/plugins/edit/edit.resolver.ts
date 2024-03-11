import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminPluginsService } from "./edit.service";
import { ShowAdminPlugins } from "../show/dto/show.obj";
import { EditAdminPluginsArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class EditAdminPluginsResolver {
  constructor(private readonly service: EditAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__edit(
    @Args() args: EditAdminPluginsArgs
  ): Promise<ShowAdminPlugins> {
    return await this.service.edit(args);
  }
}
