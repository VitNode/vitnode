import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminMembersArgs, ShowAdminMembersObj } from './show.dto';
import { ShowAdminMembersService } from './show.service';

@Resolver()
export class ShowAdminMembersResolver {
  constructor(private readonly service: ShowAdminMembersService) {}

  @Query(() => ShowAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'users',
    permission: 'can_manage_members',
  })
  async admin__core_members__show(
    @Args() args: ShowAdminMembersArgs,
  ): Promise<ShowAdminMembersObj> {
    return this.service.show(args);
  }
}
