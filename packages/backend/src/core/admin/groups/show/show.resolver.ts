import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminGroupsArgs, ShowAdminGroupsObj } from './show.dto';
import { ShowAdminGroupsService } from './show.service';

@Resolver()
export class ShowAdminGroupsResolver {
  constructor(private readonly service: ShowAdminGroupsService) {}

  @Query(() => ShowAdminGroupsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'can_manage_groups',
    permission: '',
  })
  async admin__core_groups__show(
    @Args() args: ShowAdminGroupsArgs,
  ): Promise<ShowAdminGroupsObj> {
    return this.service.show(args);
  }
}
