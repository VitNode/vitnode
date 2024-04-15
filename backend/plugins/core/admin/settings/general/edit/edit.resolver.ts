import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminGeneralSettingsService } from "./edit.service";
import { EditAdminGeneralSettingsArgs } from "./dto/edit.args";

import { ShowSettingsObj } from "@/plugins/core/settings/show/dto/show.obj";
import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminGeneralSettingsResolver {
  constructor(private readonly service: EditAdminGeneralSettingsService) {}

  @Mutation(() => ShowSettingsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_general_settings__edit(
    @Args() args: EditAdminGeneralSettingsArgs
  ): Promise<ShowSettingsObj> {
    return await this.service.edit(args);
  }
}
