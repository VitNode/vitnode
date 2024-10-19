import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from '../show/show.dto';
import { CreateAdminNavPluginsArgs } from './create.dto';
import { CreateAdminNavPluginsService } from './create.service';

@Resolver()
export class CreateAdminNavPluginsResolver {
  constructor(private readonly service: CreateAdminNavPluginsService) {}

  @Mutation(() => ShowAdminNavPluginsObj)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__nav__create(
    @Args() args: CreateAdminNavPluginsArgs,
  ): Promise<ShowAdminNavPluginsObj> {
    return this.service.create(args);
  }
}
