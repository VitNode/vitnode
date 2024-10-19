import { AdminAuthGuards, AdminPermission, OnlyForDevelopment } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminNavPluginsObj } from './show.dto';
import { ShowAdminNavPluginsService } from './show.service';

@Resolver()
export class ShowAdminNavPluginsResolver {
  constructor(private readonly service: ShowAdminNavPluginsService) {}

  @Query(() => [ShowAdminNavPluginsObj])
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  admin__core_plugins__nav__show(
    @Args('plugin_code', { type: () => String }) plugin_code: string,
  ): ShowAdminNavPluginsObj[] {
    return this.service.show({ plugin_code });
  }
}
