import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import {
  ShowAdminStaffModeratorsArgs,
  ShowAdminStaffModeratorsObj,
} from './show.dto';
import { ShowAdminStaffModeratorsService } from './show.service';

@Resolver()
export class ShowAdminStaffModeratorsResolver {
  constructor(private readonly service: ShowAdminStaffModeratorsService) {}

  @Query(() => ShowAdminStaffModeratorsObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'staff',
    permission: 'can_manage_staff_moderators',
  })
  async admin__core_staff_moderators__show(
    @Args() args: ShowAdminStaffModeratorsArgs,
  ): Promise<ShowAdminStaffModeratorsObj> {
    return this.service.show(args);
  }
}
