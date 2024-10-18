import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminEmailSettingsServiceObj } from '../show/show.dto';
import { EditAdminEmailSettingsServiceArgs } from './edit.dto';
import { EditAdminEmailSettingsService } from './edit.service';

@Resolver()
export class EditAdminEmailSettingsResolver {
  constructor(private readonly service: EditAdminEmailSettingsService) {}

  @Mutation(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_email',
  })
  async admin__core_email_settings__edit(
    @Args() args: EditAdminEmailSettingsServiceArgs,
  ): Promise<ShowAdminEmailSettingsServiceObj> {
    return this.service.edit(args);
  }
}
