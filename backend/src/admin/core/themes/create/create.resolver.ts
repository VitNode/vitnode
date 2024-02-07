import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminThemesService } from "./create.service";
import { CreateAdminThemesArgs } from "./dto/create.args";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class CreateAdminThemesResolver {
  constructor(private readonly service: CreateAdminThemesService) {}

  @Mutation(() => ShowAdminThemes)
  @UseGuards(AdminAuthGuards)
  async core_themes__admin__create(
    @Args() args: CreateAdminThemesArgs
  ): Promise<ShowAdminThemes> {
    return await this.service.create(args);
  }
}
