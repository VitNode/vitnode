import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePositionAdminNavPluginsArgs } from './change_position.dto';
import { ChangePositionAdminNavPluginsService } from './change_position.service';

@Resolver()
export class ChangePositionAdminNavPluginsResolver {
  constructor(private readonly service: ChangePositionAdminNavPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__nav__change_position(
    @Args() args: ChangePositionAdminNavPluginsArgs,
  ): Promise<string> {
    return this.service.changePosition(args);
  }
}
