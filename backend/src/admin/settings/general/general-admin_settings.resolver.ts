import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GeneralAdminSettingsObj } from './dto/general-admin_settings.obj';
import { EditGeneralAdminSettingsService } from './edit/edit-general-admin_settings.service';
import { EditGeneralAdminSettingsArgs } from './edit/dto/edit-general-admin_settings.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class GeneralAdminSettingsResolver {
  constructor(private readonly service: EditGeneralAdminSettingsService) {}

  @Mutation(() => GeneralAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async edit_general_admin_settings(
    @Args() args: EditGeneralAdminSettingsArgs
  ): Promise<GeneralAdminSettingsObj> {
    return await this.service.edit(args);
  }
}
