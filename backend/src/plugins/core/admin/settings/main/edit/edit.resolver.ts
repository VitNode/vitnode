import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminMainSettingsService } from "./edit.service";
import { EditAdminMainSettingsArgs } from "./dto/edit.args";
import { EditAdminSettingsObj } from "./dto/edit.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminMainSettingsResolver {
  constructor(private readonly service: EditAdminMainSettingsService) {}

  @Mutation(() => EditAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_main_settings__edit(
    @Args() args: EditAdminMainSettingsArgs
  ): Promise<EditAdminSettingsObj> {
    return this.service.edit(args);
  }
}
