import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminAuthorizationSettingsObj } from '../show/show.dto';
import { EditAdminAuthorizationSettingsArgs } from './edit.dto';
import { EditAdminAuthorizationSettingsService } from './edit.service';

@Resolver()
export class EditAdminAuthorizationSettingsResolver {
  constructor(
    private readonly service: EditAdminAuthorizationSettingsService,
  ) {}

  @Mutation(() => ShowAdminAuthorizationSettingsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_authorization',
  })
  admin__core_authorization_settings__edit(
    @Args() args: EditAdminAuthorizationSettingsArgs,
  ): ShowAdminAuthorizationSettingsObj {
    return this.service.edit(args);
  }
}
