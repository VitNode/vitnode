import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { GeneralAdminSettingsObj } from "../dto/general.obj";
import { EditGeneralAdminSettingsService } from "./edit.service";
import { EditGeneralAdminSettingsArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class GeneralAdminSettingsResolver {
  constructor(private readonly service: EditGeneralAdminSettingsService) {}

  @Mutation(() => GeneralAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async admin_settings__general__edit(
    @Args() args: EditGeneralAdminSettingsArgs
  ): Promise<GeneralAdminSettingsObj> {
    return await this.service.edit(args);
  }
}
