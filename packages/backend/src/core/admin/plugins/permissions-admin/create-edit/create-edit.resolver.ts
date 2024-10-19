import { PermissionsStaff } from '@/core/admin/staff/administrators/permissions/dto';
import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateEditAdminPermissionsAdminPluginsArgs } from './create-edit.dto';
import { CreateEditAdminPermissionsAdminPluginsService } from './create-edit.service';

@Resolver()
export class CreateEditAdminPermissionsAdminPluginsResolver {
  constructor(
    private readonly service: CreateEditAdminPermissionsAdminPluginsService,
  ) {}

  @Mutation(() => PermissionsStaff)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__permissions_admin__create_edit(
    @Args() args: CreateEditAdminPermissionsAdminPluginsArgs,
  ): Promise<PermissionsStaff> {
    return await this.service.createEdit(args);
  }
}
