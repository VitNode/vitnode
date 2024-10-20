import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminPluginsArgs, ShowAdminPluginsObj } from './show.dto';
import { ShowAdminPluginsService } from './show.service';

@Resolver()
export class ShowAdminPluginsResolver {
  constructor(private readonly service: ShowAdminPluginsService) {}

  @Query(() => ShowAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'can_manage_plugins',
    permission: '',
  })
  async admin__core_plugins__show(
    @Args() args: ShowAdminPluginsArgs,
  ): Promise<ShowAdminPluginsObj> {
    return this.service.show(args);
  }
}
