import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminMainSettingsArgs, EditAdminSettingsObj } from './edit.dto';
import { EditAdminMainSettingsService } from './edit.service';

@Resolver()
export class EditAdminMainSettingsResolver {
  constructor(private readonly service: EditAdminMainSettingsService) {}

  @Mutation(() => EditAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_main',
  })
  async admin__core_main_settings__edit(
    @Args() args: EditAdminMainSettingsArgs,
  ): Promise<EditAdminSettingsObj> {
    return this.service.edit(args);
  }
}
