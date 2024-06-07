import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminEmailSettingsService } from "./edit.service";
import { EditAdminEmailSettingsServiceArgs } from "./dto/edit.args";
import { ShowAdminEmailSettingsServiceObj } from "../show/dto/show.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminEmailSettingsResolver {
  constructor(private readonly service: EditAdminEmailSettingsService) {}

  @Mutation(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  admin__core_email_settings__edit(
    @Args() args: EditAdminEmailSettingsServiceArgs
  ): ShowAdminEmailSettingsServiceObj {
    return this.service.edit(args);
  }
}
