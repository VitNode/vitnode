import { PermissionsStaff } from '@/core/admin/staff/administrators/permissions/dto';
import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminPermissionsAdminPluginsService } from './show.service';

@Resolver()
export class ShowAdminPermissionsAdminPluginsResolver {
  constructor(
    private readonly service: ShowAdminPermissionsAdminPluginsService,
  ) {}

  @Query(() => [PermissionsStaff])
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__permissions_admin__show(
    @Args('plugin_code', { type: () => String }) plugin_code: string,
  ): Promise<PermissionsStaff[]> {
    return await this.service.show({ plugin_code });
  }
}
