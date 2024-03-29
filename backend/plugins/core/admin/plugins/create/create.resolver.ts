import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminPluginsService } from "./create.service";
import { CreateAdminPluginsArgs } from "./dto/create.args";
import { ShowAdminPlugins } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { OnlyForDevelopment } from "@/utils/guards/dev.guard";

@Resolver()
export class CreateAdminPluginsResolver {
  constructor(private readonly service: CreateAdminPluginsService) {}

  @Mutation(() => ShowAdminPlugins)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_plugins__create(
    @Args() args: CreateAdminPluginsArgs
  ): Promise<ShowAdminPlugins> {
    return await this.service.create(args);
  }
}
