import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminThemesService } from "./create.service";
import { CreateAdminThemesArgs } from "./dto/create.args";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { OnlyForDevelopment } from "@/utils/guards/dev.guard";

@Resolver()
export class CreateAdminThemesResolver {
  constructor(private readonly service: CreateAdminThemesService) {}

  @Mutation(() => ShowAdminThemes)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  async admin__core_themes__create(
    @Args() args: CreateAdminThemesArgs
  ): Promise<ShowAdminThemes> {
    return this.service.create(args);
  }
}
