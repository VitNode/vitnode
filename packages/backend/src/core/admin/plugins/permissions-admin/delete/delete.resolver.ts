import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminPermissionsAdminPluginsArgs } from './delete.dto';
import { DeleteAdminPermissionsAdminPluginsService } from './delete.service';

@Resolver()
export class DeleteAdminPermissionsAdminPluginsResolver {
  constructor(
    private readonly service: DeleteAdminPermissionsAdminPluginsService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__permissions_admin__delete(
    @Args() args: DeleteAdminPermissionsAdminPluginsArgs,
  ): Promise<string> {
    return await this.service.delete(args);
  }
}
