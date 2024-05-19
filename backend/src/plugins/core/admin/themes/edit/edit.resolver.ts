import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminThemes } from "../show/dto/show.obj";
import { EditAdminThemesService } from "./edit.service";
import { EditAdminThemesArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminThemesResolver {
  constructor(private readonly service: EditAdminThemesService) {}

  @Mutation(() => ShowAdminThemes)
  @UseGuards(AdminAuthGuards)
  async admin__core_themes__edit(
    @Args() args: EditAdminThemesArgs
  ): Promise<ShowAdminThemes> {
    return this.service.edit(args);
  }
}
