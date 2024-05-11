import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminNavService } from "./create.service";
import { CreateAdminNavArgs } from "./dto/create.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { ShowCoreNav } from "@/plugins/core/nav/show/dto/show.obj";

@Resolver()
export class CreateAdminNavResolver {
  constructor(private readonly service: CreateAdminNavService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__create(
    @Args() args: CreateAdminNavArgs
  ): Promise<ShowCoreNav> {
    return await this.service.create(args);
  }
}
